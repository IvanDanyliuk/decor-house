'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import { utapi } from '../uploadthing';
import Interior from '../models/interior.model';


const interiorSchema = zod.object({
  title: zod.string().min(1, 'Title is required!'),
  description: zod.string().min(1, 'Description is required'),
  image: zod.string().min(1, 'Interior image is required!'),
  products: zod.any(),
});


export const createInterior = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const rawImage = formData.get('image') as string;
  const products = formData.get('products') as string;

  try {
    await connectToDB();

    const validatedFields = interiorSchema.safeParse({
      ...data, image: rawImage, products: products.split(', ')
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    console.log('CREATE INTERIOR ACTION', data)

    const imageFile = await fetch(rawImage);
    const image = await imageFile.blob();

    const imageUrl = new Blob([image]).size > 0 ? 
      (await utapi.uploadFiles([image]))[0].data?.url : 
      prevState.image;

    if(!imageUrl) return { error: 'Interior Image is required' };

    await Interior.create({
      ...data,
      image: imageUrl,
      products: products ? products.split(', ') : [],
    });

    revalidatePath('/dashboard/interiors');

    return {
      data: {},
      error: null,
      message: 'New Interior has been created!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new interior',
    };
  }
};

export const updateInterior = async (prevState: any, formData: FormData) => {
  const id = prevState._id;
  const data = Object.fromEntries(formData);
  const rawImage = formData.get('image') as string;
  const products = formData.get('products') as string;

  try {
    await connectToDB();

    const validatedFields = interiorSchema.safeParse({
      ...data, image: rawImage, products: products.split(', ')
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageFile = await fetch(rawImage);
    const image = await imageFile.blob();

    const imageUrl = new Blob([image]).size > 0 && rawImage !== prevState.image ? 
      (await utapi.uploadFiles([image]))[0].data?.url : 
      prevState.image;

    if(!imageUrl) return { error: 'Interior Image is required' };

    if(rawImage !== prevState.image) {
      const imageToDelete = prevState.image.substring(prevState.image.lastIndexOf('/') + 1);
      await utapi.deleteFiles(imageToDelete);
    }

    await Interior.findByIdAndUpdate(id, {
      ...data,
      image: imageUrl,
      products: products ? products.split(', ') : [],
    });
    
    revalidatePath('/dashboard/interiors');

    return {
      data: null,
      error: null,
      message: 'Interior has been successfully updated!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot update an interior',
    };
  }
};

export const deleteInterior = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    const interior = await Interior.findById(id);
    const imageUrl = interior.image.substring(interior.image.lastIndexOf('/') + 1);

    await utapi.deleteFiles(imageUrl);

    await Interior.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'Interior has been successfyllt deleted!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot delete an interior',
    };
  }
};