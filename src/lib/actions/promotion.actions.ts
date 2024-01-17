'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import Promotion from '../models/promotion.model';
import { connectToDB } from '../database';
import { utapi } from '../uploadthing';


const promotionSchema = zod.object({
  title: zod.string().min(1, 'Name is required!'),
  image: zod.string().min(1, 'Category image is required'),
  periodFrom: zod.string(),
  periodTo: zod.string(),
  description: zod.string(),
  products: zod.any(),
});


export const createPromotion = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const products = formData.get('products') as string;

  try {
    await connectToDB();

    const validatedFields = promotionSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageFile = await fetch(data.image as string);
    const imageBlob = await imageFile.blob();

    const imageUrl = new Blob([imageBlob]).size > 0 ? 
      (await utapi.uploadFiles([imageBlob]))[0].data?.url : 
      null;

    if(!imageUrl) return { error: 'Promotion Image is required' };

    await Promotion.create({
      ...data, 
      products: products.split(', '),
      image: imageUrl,
    });

    revalidatePath('/dashboard/promotions');

    return {
      data: null,
      error: null,
      message: 'Promotion has been successfully created',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new promotion',
    };
  }
};

export const updatePromotion = async (prevState: any, formData: FormData) => {
  const id = prevState._id;
  const data = Object.fromEntries(formData);
  const rawImage = formData.get('image') as string;
  const products = formData.get('products') as string;

  try {
    await connectToDB();

    const validatedFields = promotionSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageFile = await fetch(rawImage);
    const image = await imageFile.blob();

    const imageUrl = new Blob([image]).size > 0 ? 
      (await utapi.uploadFiles([image]))[0].data?.url : 
      prevState.image;

    const imageToDelete = prevState.image.substring(prevState.image.lastIndexOf('/') + 1);
    await utapi.deleteFiles(imageToDelete);

    console.log('UPDATE PROMOTION', data)

    await Promotion.findByIdAndUpdate(id, {
      ...data,
      image: imageUrl,
      products: products.split(', '),
    });

    revalidatePath('/dashboard/promotions');

    return {
      data: null,
      error: null,
      message: 'Promotion has been successfully updated',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot update the promotion',
    };
  }
};

export const deletePromotion = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    const promotion = await Promotion.findById(id);
    const imageUrl = promotion.image.substring(promotion.image.lastIndexOf('/') + 1);
    await utapi.deleteFiles(imageUrl);

    await Promotion.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'Promotion has been successfully deleted!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Unable to delete the promotion',
    };
  }
};