'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Manufacturer from '../models/manufacturer.model';


const manufacturerSchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  country: zod.string().min(1, 'Country is required!'),
});


export const getManufacturers = async ({ page, itemsPerPage }: { page: number, itemsPerPage: number }) => {
  try {
    await connectToDB();

    const manufacturers = await Manufacturer
      .find({})
      .limit(itemsPerPage)
      .skip((page - 1) * itemsPerPage)
      .select('-__v');

    const count = await Manufacturer.countDocuments();

    return {
      data: {
        manufacturers,
        count, 
      },
      error: null,
      message: '',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot find manufacturers',
    };
  }
};

export const getManufacturer = async (id: string) => {
  try {
    await connectToDB();

    const manufacturer = await Manufacturer
      .findById(id)
      .select('-__v');

    return {
      data: manufacturer,
      error: null,
      message: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot find the manufacturer',
    };
  }
}

export const createManufacturer = async (prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const country = formData.get('country');

  try {
    await connectToDB();

    const validatedFields = manufacturerSchema.safeParse({ name, country });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    await Manufacturer.create({ name, country });

    revalidatePath('/dashboard/menufacturers');

    return {
      data: null,
      error: null,
      message: 'New Manufacturer has been sucessfully created!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Unable to create a new manufacturer',
    };
  }
};

export const updateManufacturer = async (prevState: any, formData: FormData) => {
  const id = prevState._id;
  const name = formData.get('name');
  const country = formData.get('country');

  try {
    await connectToDB();

    const validatedFields = manufacturerSchema.safeParse({ name, country });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    await Manufacturer.findByIdAndUpdate(id, { name, country });

    revalidatePath('/dashboard/menufacturers');

    return {
      data: null,
      error: null,
      message: 'The manufacturer has been successfully updated!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Unable to update the manufacturer data',
    };
  }
};

export const deleteManufacturer = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    await Manufacturer.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'Manufacturer has been successfully deleted!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Unable to delete the manufacturer',
    };
  }
};