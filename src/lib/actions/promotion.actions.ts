'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import Promotion from '../models/promotion.model';
import { connectToDB } from '../database';
import { utapi } from '../uploadthing';


const promotionSchema = zod.object({
  title: zod.string().min(1, 'Name is required!'),
  image: zod.string().min(1, 'Category image is required'),
  periodFrom: zod.string(),
  periodTo: zod.string(),
  description: zod.string(),
  products: zod.any(),
});


export const getPromotions = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  try {
    await connectToDB();

    const promotions = (page && itemsPerPage) ? 
      await Promotion
        .find({})
        .limit(itemsPerPage)
        .skip((page - 1) * itemsPerPage)
        .populate('products')
        .select('-__v') :
      await Promotion
        .find({})
        .populate('products')
        .select('-__v');

    const count = await Promotion.countDocuments();

    return {
      data: {
        promotions,
        count
      },
      error: null,
      message: '',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot find promotions',
    };
  }
};

export const getPromotion = async (id: string) => {
  try {
    await connectToDB();

    const promotion = await Promotion
      .findById(id)
      .populate('products')
      .select('-__v');

    return {
      data: promotion,
      error: null,
      message: '',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: `Cannot find the promotion with ID: ${id}`,
    };
  }
};

export const createPromotion = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const products = formData.get('products') as string;

  console.log('CREATE PROMOTION', data)

  try {
    await connectToDB();

    const validatedFields = promotionSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageFile = await fetch(data.image as string);
    const imageBlob = await imageFile.blob();

    const imageUrl = new Blob([imageBlob]).size > 0 ? 
      (await utapi.uploadFiles([imageBlob]))[0].data?.url : 
      null;

    if(!imageUrl) return { error: 'Promotion Image is required' };

    console.log('PROMOTION DATA', {
      ...data, 
      products: products.split(', '),
      image: imageUrl,
    })

    await Promotion.create({
      ...data, 
      products: products.split(', '),
      image: imageUrl,
    });

    return {
      data: null,
      error: null,
      message: 'Promotion has been successfully created',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new promotion',
    };
  }
};

export const updatePromotion = async (prevState: any, formData: FormData) => {
  try {
    
  } catch (error: any) {
    
  }
};

export const deletePromotion = async () => {

};