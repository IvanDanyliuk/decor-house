'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Category from '../models/category.model';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants';
import { utapi } from '../uploadthing';


const productSchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  image: zod
    .any()
    .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type))
    .or(zod.any()),
  types: zod.string(),
  features: zod.string(),
});


export const createProduct = async (prevState: any, formData: FormData) => {
  console.log('CREATE PRODUCT', Object.fromEntries(formData))
}