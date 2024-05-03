'use server';

import { cache } from 'react';
import { connectToDB } from '../database';
import Order from '../models/order.model';
import Product from '../models/product.model';
import User from '../models/user.model';


export const getUsers = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  await connectToDB();

  const users = (page && itemsPerPage) ? 
    await User
      .find({})
      .sort({ 'createdAt': -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .select('-password -__v') : 
    await User
      .find({})
      .sort({ 'createdAt': -1 })
      .select('-password -__v');
  
  const count = await User.countDocuments();

  return {
    data: {
      users,
      count,
    }, 
    error: null,
    message: '',
  } as any;
};

export const getUser = async (id: string) => {
  await connectToDB();

  const user = await User
    .findById(id)
    .populate([
      { path: 'viewed', model: Product },
      { path: 'productCart', populate: 'product', model: Product },
    ])
    .select('-password -__v')
    .lean();

  return user as any;
};

export const getCurrentUser = async (email: string) => {
  await connectToDB();

  const user = await User.findOne({ email }).populate({ path: 'cart.product', select: '-__v', model: Product }).select('-password -__v');

  return JSON.parse(JSON.stringify(user)) as any;
};

export const getProfileData = cache(async (id: string) => {
  await connectToDB();

  const user: any = await User
    .findById(id)
    .populate({ path: 'cart.product', select: '-__v', model: Product })
    .select('-__v')
    .lean();
    
  const orders = await Order
    .find({ 'user.email': user!.email! })
    .populate({ path: 'products.product', select: '-__v', model: Product })
    .select('-__v')
    .lean();

  return {
    profile: user,
    orders
  } as any;
});