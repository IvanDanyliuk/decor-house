'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Category from '../models/category.model';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants';
import { utapi } from '../uploadthing';
import Product from '../models/product.model';


const productSchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  category: zod.string().min(1, 'A product should have a category'),
  type: zod.string().min(1, 'A product should have a type'),
  features: zod.string(),
  manufacturer: zod.object({
    name: zod.string(),
    country: zod.string(),
  }),
  colors: zod.array(zod.string()),
  price: zod.string(),
  sale: zod.string(),
  width: zod.string(),
  height: zod.string(),
  depth: zod.string(),
  description: zod.string(),
  characteristics: zod.string(),
  images: zod.array(zod
    .any()
    .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type))
    .or(zod.any()),)
});


export const createProduct = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('CREATE PRODUCT ACTION', data)
  // try {
  //   await connectToDB();

  //   console.log('CREATE PRODUCT ACTION', data)

  //   // const validatedFields = productSchema.safeParse(data);

  //   // if(!validatedFields.success) {
  //   //   return {
  //   //     error: validatedFields.error.flatten().fieldErrors,
  //   //   }
  //   // }

  //   // const existingProduct = await Product.findOne({ name });

  //   // if(existingProduct) return { error: 'Product already exists' };

  //   // const imageUrls = [''];

  //   // if(imageUrls.length === 0) return { error: 'Product card should contain at least 1 image' };

  //   // await Product.create({
  //   //   ...data,
  //   //   size: {
  //   //     width: data.width,
  //   //     height: data.height,
  //   //     depth: data.depth,
  //   //   },
  //   //   images: imageUrls
  //   // });

  //   // console.log('CREATE PRODUCT ACTION', data)

  //   revalidatePath('/dashboard/products');

  //   return {
  //     data: null,
  //     error: null,
  //     message: 'A new product has been successfully created',
  //   };
  // } catch (error: any) {
  //   return {
  //     data: null,
  //     error: error.message,
  //     message: 'Cannot create a new product',
  //   }
  // }
};