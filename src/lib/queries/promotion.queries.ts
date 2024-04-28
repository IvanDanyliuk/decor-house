'use server';

import mongoose from 'mongoose';
import { connectToDB } from '../database';
import Product from '../models/product.model';
import Promotion from '../models/promotion.model';


export const getPromotions = async ({ 
  page, 
  itemsPerPage, 
  period
}: { 
  page?: number;
  itemsPerPage?: number;
  period?: string;
}) => {
  const query = period === 'current' ? 
    { $and: [
      { periodFrom: { $lte: new Date().toISOString() } },
      { periodTo: { $gte: new Date().toISOString() } }
    ] } : 
      period === 'past' ? 
        { periodTo: { $lte: new Date().toISOString() } } :
        {};

  await connectToDB();

  const promotions = (page && itemsPerPage) ? 
    await Promotion
      .find(query)
      .sort({ 'createdAt': -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .populate({ path: 'products', model: Product })
      .select('-__v')
      .lean() :
    await Promotion
      .find(query)
      .sort({ 'createdAt': -1 })
      .populate({ path: 'products', model: Product })
      .select('-__v')
      .lean();

  const count = await Promotion.countDocuments(query);

  return {
    data: {
      promotions, 
      count
    },
    error: null,
    message: '',
  } as any;
};

export const getPromotion = async (id: string) => {
  await connectToDB();

  const isPromotionIdValid = mongoose.Types.ObjectId.isValid(id);
  
  const promotion = isPromotionIdValid ? 
    await Promotion
      .findById(id)
      .populate({ path: 'products', model: Product })
      .select('-__v')
      .lean() : 
    null;

  return {
    data: promotion,
    error: null,
    message: '',
  } as any;
};