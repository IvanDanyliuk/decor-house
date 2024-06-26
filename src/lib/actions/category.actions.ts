'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Category from '../models/category.model';
import { utapi } from '../uploadthing';


const categorySchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  image: zod.string().min(1, 'Category image is required'),
  types: zod.string(),
  features: zod.string(),
});


export const createCategory = async (details: any, prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const rawImage = formData.get('image') as string;
  const types = details.types as string;
  const features = details.features as string;

  try {
    await connectToDB();

    const validatedFields = categorySchema.safeParse({
      name, image: rawImage, types, features
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageFile = await fetch(rawImage);
    const image = await imageFile.blob();

    const existingCategory = await Category.findOne({ name });

    if(existingCategory) return { error: 'Category already exists' };

    const imageUrl = new Blob([image]).size > 0 ? 
      (await utapi.uploadFiles([image]))[0].data?.url : 
      null;

    if(!imageUrl) return { error: 'Category Image is required' };

    await Category.create({
      name, 
      image: imageUrl,
      types: types ? types.split(', ') : [], 
      features: features ? features.split(', ') : [],
    });

    revalidatePath('/dashboard/categories');

    return {
      data: null,
      error: null,
      message: 'New Category has been successfully created!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Unable to create a new category',
    };
  }
};

export const updateCategory = async (details: any, prevState: any, formData: FormData) => {
  const id = details.categoryId;
  const name = formData.get('name');
  const rawImage = formData.get('image') as string;

  try {
    await connectToDB();

    const validatedFields = categorySchema.safeParse({ name, image: rawImage, types: details.types, features: details.features });

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

    if(rawImage !== prevState.image) {
      const imageToDelete = prevState.image.substring(prevState.image.lastIndexOf('/') + 1);
      await utapi.deleteFiles(imageToDelete);
    }

    await Category.findByIdAndUpdate(id, { 
      name, 
      image: imageUrl, 
      types: details.types ? details.types.split(', ') : [], 
      features: details.features ? details.features.split(', ') : [] 
    });

    revalidatePath('/dashboard/categories');

    return {
      data: null,
      error: null,
      message: 'Category has been successfully updated!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Unable to update the category data',
    };
  }
};

export const deleteCategory = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    const category = await Category.findById(id);
    const imageUrl = category.image.substring(category.image.lastIndexOf('/') + 1);

    await utapi.deleteFiles(imageUrl);

    await Category.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'Category has been successfully deleted!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Unable to delete the category',
    };
  }
};