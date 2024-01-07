'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants';
import { utapi } from '../uploadthing';
import Product from '../models/product.model';
import Category from '../models/category.model';
import Manufacturer from '../models/manufacturer.model';


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
        .populate([
          { path: 'category', select: 'name', model: Category },
          { path: 'manufacturer', model: Manufacturer }
        ])
        .select('-__v') :
      await Product
        .find({})
        .populate([
          { path: 'category', select: 'name', model: Category },
          { path: 'manufacturer', model: Manufacturer }
        ])
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
};

export const getProduct = async (id: string) => {
  try {
    await connectToDB();

    const product = await Product
      .findById(id)
      .select('-__v');

    return {
      data: product,
      error: null,
      message: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: `Cannot find the product with ID: ${id}`,
    };
  }
};

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

export const updateProduct = async (prevState: any, formData: FormData) => {
  const id = prevState._id;

  try {
    await connectToDB();

    console.log('UPDATE PRODUCT ACTION', {
      prevState, formData: Object.fromEntries(formData)
    })

    // const validatedFields = productSchema.safeParse(data);

    // if(!validatedFields.success) {
    //   return {
    //     error: validatedFields.error.flatten().fieldErrors,
    //   }
    // }


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
}