'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Shop from '../models/shop.model';


const shopSchema = zod.object({
  name: zod.string(),
  address: zod.string(),
  coordinates: zod.string(),
});


export const createShop = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const coordinatesStr = formData.get('coordinates') as string;

  try {
    await connectToDB();  

    const validatedFields = shopSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const coordinates = JSON.parse(coordinatesStr);

    await Shop.create({
      ...data,
      coordinates
    });

    revalidatePath('/dashboard/shops');

    return {
      data: null,
      error: null,
      message: 'New Shop has been successfully created!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new shop',
    };
  }
};

export const updateShop = async (prevState: any, formData: FormData) => {
  const id = prevState.id;
  const data = Object.fromEntries(formData);
  const coordinatesStr = formData.get('coordinates') as string;

  try {
    await connectToDB();

    const validatedFields = shopSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const coordinates = JSON.parse(coordinatesStr);

    await Shop.findByIdAndUpdate(id, {
      ...data,
      coordinates
    });

    revalidatePath('/dashboard/shops');

    return {
      data: null,
      error: null,
      message: 'Shop has been updated!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot update the shop data',
    };
  }
};

export const deleteShop = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    await Shop.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'Shop has been successfully deleted!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot delete a shop',
    };
  }
};