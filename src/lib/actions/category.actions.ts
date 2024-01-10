'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Category from '../models/category.model';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants';
import { utapi } from '../uploadthing';


const categorySchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  image: zod.string().min(1, 'Category image is required'),
  types: zod.string(),
  features: zod.string(),
});


export const getCategories = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  try {
    await connectToDB();

    const categories = (page && itemsPerPage) ? 
      await Category
        .find({})
        .limit(itemsPerPage)
        .skip((page - 1) * itemsPerPage)
        .select('-__v') :
      await Category
        .find({})
        .select('-__v');

    const count = await Category.countDocuments();

    return {
      data: {
        categories, 
        count
      },
      error: null,
      message: '',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot find categories',
    };
  }
};

export const getCategory = async (id: string) => {
  try {
    await connectToDB();

    const category = await Category
      .findById(id)
      .select('-__v');

    return {
      data: category,
      error: null,
      message: '',
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot find a category',
    };
  }
};

export const createCategory = async (prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const rawImage = formData.get('image') as string;
  const types = formData.get('types') as string;
  const features = formData.get('features') as string;

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

export const updateCategory = async (prevState: any, formData: FormData) => {
  const id = prevState._id;
  const name = formData.get('name');
  const rawImage = formData.get('image') as string;
  const types = formData.get('types') as string;
  const features = formData.get('features') as string;

  try {
    await connectToDB();

    const validatedFields = categorySchema.safeParse({ name, image: rawImage, types, features });

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

    await Category.findByIdAndUpdate(id, { 
      name, 
      image: imageUrl, 
      types: types ? types.split(', ') : [], 
      features: features ? features.split(', ') : [] 
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