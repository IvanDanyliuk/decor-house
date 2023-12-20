'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Category from '../models/category.model';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from '../constants';
import { utapi } from '../uploadthing';


const categorySchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  image: zod
    .any()
    .refine(files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type)),
  types: zod.string(),
  features: zod.string(),
});


export const getCategories = async ({ page, itemsPerPage }: { page: number, itemsPerPage: number }) => {
  try {
    await connectToDB();

    const categories = await Category
      .find({})
      .limit(itemsPerPage)
      .skip((page - 1) * itemsPerPage)
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

export const createCategory = async (prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const image = formData.getAll('image');
  const types = formData.get('types') as string;
  const features = formData.get('features') as string;

  

  try {
    await connectToDB();

    const validatedFields = categorySchema.safeParse({
      name, image, types, features
    });

    if(!validatedFields.success) {
      console.log('VALIDATION ERROR', validatedFields.error.flatten().fieldErrors)
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    console.log('CREATE CATEGORY ACTION', {
      name,
      image,
      types,
      features,
    })

    const existingCategory = await Category.findOne({ name });

    if(existingCategory) return { error: 'Category already exists' };

    const imageUrl = new Blob(image).size > 0 ? (await utapi.uploadFiles(image))[0].data?.url : null;

    if(!imageUrl) return { error: 'Category Image is required' };

    await Category.create({
      name, 
      image: imageUrl,
      types: types.split(', '), 
      features: features.split(', '),
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
  const image = formData.get('image');
  const types = formData.getAll('types');
  const features = formData.getAll('features');

  try {
    await connectToDB();

    const validatedFields = categorySchema.safeParse({
      name, image, types, features
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    await Category.findByIdAndUpdate(id, { name, image, types, features });

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