'use server';

import { connectToDB } from '../database';
import Manufacturer from '../models/manufacturer.model';


export const getManufacturers = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  await connectToDB();

  const manufacturers = (page && itemsPerPage) ? 
    await Manufacturer
      .find({})
      .sort({ 'createdAt': -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .select('-__v') : 
    await Manufacturer
      .find({})
      .sort({ 'createdAt': -1 })
      .select('-__v');

  const count = await Manufacturer.countDocuments();

  return {
    data: {
      manufacturers,
      count, 
    },
    error: null,
    message: '',
  } as any;
};

export const getManufacturer = async (id: string) => {
  await connectToDB();

  const manufacturer = await Manufacturer
    .findById(id)
    .select('-__v');

  return {
    data: manufacturer,
    error: null,
    message: '',
  } as any;
};