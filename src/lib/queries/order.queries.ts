'use server';

import { connectToDB } from '../database';
import Order from '../models/order.model';
import Product from '../models/product.model';


export const getOrders = async ({ 
  page, 
  itemsPerPage, 
  email 
}: { 
  page?: number, 
  itemsPerPage?: number, 
  email?: string 
}) => {
  const query = email ? { 'user.email': email } : {};

  await connectToDB();

  const orders = (page && itemsPerPage) ? 
    await Order
      .find(query)
      .sort({ 'createdAt': -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .populate({ path: 'products.product', select: '-__v', model: Product })
      .select('-__v')
      .lean() :
    await Order
      .find(query)
      .sort({ 'createdAt': -1 })
      .populate({ path: 'products.product', select: '-__v', model: Product })
      .select('-__v')
      .lean();
    
  const count = await Order.countDocuments();

  return {
    data: {
      orders,
      count
    },
    error: null,
    message: '',
  } as any;
};

export const getOrder = async (id: string) => {
  await connectToDB();
    
  const order = await Order
    .findById(id)
    .populate({ path: 'products', model: Product })
    .select('-__v')
    .lean();

  return order as any;
};