'use server';

import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Manufacturer from '../models/manufacturer.model';


const manufacturerSchema = zod.object({
  name: zod.string().min(1, 'Name is required!'),
  country: zod.string().min(1, 'Country is required!'),
});


export const getManufacturers = async () => {
  try {
    await connectToDB();

    const manufacturers = await Manufacturer.find({}).select('-__v');

    return {
      data: manufacturers,
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

export const createManufacturer = async (prevState: any,formData: FormData) => {
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

    return {
      data: null,
      error: null,
      message: 'New Manufacturer has been sucessfully created!'
    }
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new manufacturer',
    };
  }
};