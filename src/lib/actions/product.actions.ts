'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants';
import { utapi } from '../uploadthing';
import Product from '../models/product.model';


const productSchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  category: zod.string().min(1, 'A product should have a category'),
  type: zod.string().min(1, 'A product should have a type'),
  features: zod.string(),
  manufacturer: zod.string(),
  colors: zod.string(),
  price: zod.string(),
  sale: zod.string(),
  width: zod.string(),
  height: zod.string(),
  depth: zod.string(),
  description: zod.string(),
  characteristics: zod.string(),
  images: zod.any()
});


export const getProducts = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  try {
    await connectToDB();

    const products = (page && itemsPerPage) ? 
      await Product
        .find({})
        .limit(itemsPerPage)
        .skip((page - 1) * itemsPerPage)
        .select('-__v') :
      await Product
        .find({})
        .select('-__v');

    const count = await Product.countDocuments();

    return {
      data: {
        products, 
        count
      },
      error: null,
      message: '',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot find products',
    };
  }
}

export const createProduct = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const features = formData.get('features') as string;
  const colors = formData.get('colors') as string;
  const images = formData.getAll('images')

  try {
    await connectToDB();
    
    const validatedFields = productSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    const existingProduct = await Product.findOne({ name: data.name });

    if(existingProduct) return { error: 'Product already exists' };

    const imageUrls = new Blob(images).size > 0 ? 
      await utapi.uploadFiles(images) : 
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
    }
  }
};