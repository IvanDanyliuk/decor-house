import mongoose from 'mongoose';
// import { AXIOS } from '../axios';
import { connectToDB } from '../database';
import Interior from '../models/interior.model';
import Product from '../models/product.model';


export const getInteriors = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  // const { data } = await AXIOS.get(
  //   '/api/interiors',
  //   { params: { page, itemsPerPage } }
  // );
  // return data;

  await connectToDB();

    const interiors = (page && itemsPerPage) ? 
      await Interior
        .find({})
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate({ path: 'products', select: '-__v', model: Product })
        .select('-__v')
        .lean() :
      await Interior
        .find({})
        .sort({ 'createdAt': -1 })
        .populate({ path: 'products', select: '-__v', model: Product })
        .select('-__v')
        .lean();
    
    const count = await Interior.countDocuments();

    return {
      data: {
        interiors,
        count,
      },
      error: null,
      message: '',
    } as any;
};

export const getInterior = async (id: string) => {
  // const { data } = await AXIOS.get(`/api/interiors/${id}`);
  // return data;

  await connectToDB();

    const isInteriorIdValid = mongoose.Types.ObjectId.isValid(id);

    const interior = isInteriorIdValid ? 
      await Interior
        .findById(id)
        .populate({ path: 'products', model: Product })
        .select('-__v') : 
      null;
  
    return {
      data: interior,
      error: null,
      message: '',
    } as any;
};