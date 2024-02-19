'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import { utapi } from '../uploadthing';
import Product from '../models/product.model';
import { ACCEPTED_IMAGE_TYPES } from '../constants';


const productSchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  category: zod.string().min(1, 'A product should have a category'),
  type: zod.string().min(1, 'A product should have a type'),
  features: zod.string(),
  manufacturer: zod.string(),
  colors: zod.string().min(7, 'Select color'),
  price: zod.string(),
  sale: zod.string(),
  width: zod.string(),
  height: zod.string(),
  depth: zod.string(),
  description: zod.string(),
  characteristics: zod.string(),
  images: zod.string().min(1, 'Product must have at least one image'),
});


export const createProduct = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const features = formData.get('features') as string;
  const colors = formData.get('colors') as string;
  const images = formData.get('images') as string;

  try {
    await connectToDB();

    const validatedFields = productSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    const filesString = images.split('|-| ');
    const imageFiles = await Promise.all(filesString.map(async (item: any) => {
      const fetched = await fetch(item);
      const blob = await fetched.blob();
      return blob;
    }));

    const isImageFormatsValid = (images: Blob[]) => {
      return images.every(image => ACCEPTED_IMAGE_TYPES.includes(image.type));
    };

    if(!isImageFormatsValid(imageFiles)) {
      return {
        error: 'Invalid image format'
      }
    }

    const existingProduct = await Product.findOne({ name: data.name });

    if(existingProduct) return { error: 'Product already exists' };

    const imageUrls = new Blob(imageFiles).size > 0 ? 
      await utapi.uploadFiles(imageFiles) : 
      null;

    if(!imageUrls || imageUrls.length === 0) return { error: 'Product card should contain at least 1 image' };

    await Product.create({
      ...data,
      features: features.split(', '),
      size: {
        width: data.width,
        height: data.height,
        depth: data.depth,
      },
      colors: colors.split(', '),
      images: imageUrls.map(item => item.data?.url)
    });

    revalidatePath('/dashboard/create-product');

    return {
      data: null,
      error: null,
      message: 'A new product has been successfully created',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new product',
    };
  }
};

export const updateProduct = async (prevState: any, formData: FormData) => {
  const id = prevState._id;
  const data = Object.fromEntries(formData);
  const colors = formData.get('colors') as string;
  const imageUrls = formData.get('images') as string;

  try {
    await connectToDB();

    const validatedFields = productSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    if(!imageUrls || imageUrls.length === 0) return { error: 'Product card should contain at least 1 image' };

    const images = imageUrls.split('|-| ');
    const existingImageUrls = images.filter(item => prevState.images.includes(item));
    const newFiles = images.filter(item => !prevState.images.includes(item));
    const imagesToDelete = prevState.images.filter((item: string) => !existingImageUrls.includes(item));

    const newFilesToUpload = await Promise.all(newFiles.map(async (item: any) => {
      const fetched = await fetch(item);
      const blob = await fetched.blob();
      return blob;
    }));

    const newFilesUrls = new Blob(newFilesToUpload).size > 0 ? 
      await utapi.uploadFiles(newFilesToUpload) : 
      null;

    const newImageUrls = newFilesUrls && newFilesUrls.length > 0 ? newFilesUrls?.map(item => item.data?.url) : [];

    if(imagesToDelete.length > 0) {
      const imagesToDeleteUrls = imagesToDelete!.map((url: string) => url.substring(url.lastIndexOf('/') + 1));
      await utapi.deleteFiles(imagesToDeleteUrls);
    }
    
    await Product.findByIdAndUpdate(prevState._id, {
      ...data,
      colors: colors.split(', '),
      images: [...existingImageUrls, ...newImageUrls],
    });

    revalidatePath('/dashboard/products');

    return {
      data: null,
      error: null,
      message: `The product with ID: ${id} has been successfully updated`,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: `Cannot update ${prevState.name}`,
    };
  }
};

export const deleteProduct = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    const product = await Product.findById(id);
    const imageUrls = product.images.map((url: string) => url.substring(url.lastIndexOf('/') + 1))
    await utapi.deleteFiles(imageUrls);

    await Product.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: `Product with ID: ${id} has been successfully deleted`,
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot delete a product',
    }
  }
};