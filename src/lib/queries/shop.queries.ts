'use server';

import { connectToDB } from '../database';
import Shop from '../models/shop.model';

export const getShops = async ({ 
  page, 
  itemsPerPage, 
  country
}: { 
  page?: number; 
  itemsPerPage?: number; 
  country?: string;
}) => {
  const query = country ? { country } : {};

  await connectToDB();

  const shops = (page && itemsPerPage) ? 
    await Shop
      .find(query)
      .sort({ 'createdAt': -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .select('-__v') :
    await Shop
      .find(query)
      .sort({ 'createdAt': -1 })
      .select('-__v');

  const count = await Shop.countDocuments();

  return {
    data: {
      shops,
      count,
    },
    error: null,
    message: '',
  } as any;
};

export const getShop = async (id: string) => {
  await connectToDB();

  const shop = await Shop
    .findById(id)
    .select('-__v');

  return {
    data: shop,
    error: null,
    message: '',
  } as any;
};

export const getLocations = async () => {
  await connectToDB();
  const locations = await Shop.find().select('country');
  const countries = [...new Set(locations.map(item => item.country))];
  return countries as any;
};