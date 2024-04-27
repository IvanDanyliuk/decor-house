// import { AXIOS } from '../axios';
import { connectToDB } from '../database';
import Category from '../models/category.model';

export const getCategories = async ({ 
  page, 
  itemsPerPage 
}: { 
  page?: number, 
  itemsPerPage?: number 
}) => {
  // const { data } = await AXIOS.get(
  //   '/api/categories', 
  //   { params: { page, itemsPerPage } }
  // );
  // return data;

  await connectToDB();

  const categories = (page && itemsPerPage) ? 
    await Category
      .find({})
      .sort({ 'createdAt': -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .select('-__v') :
    await Category
      .find({})
      .sort({ 'createdAt': -1 })
      .select('-__v');

  const count = await Category.countDocuments();

  return {
    data: {
      categories, 
      count
    },
    error: null,
    message: '',
  } as any;
};

export const getCategory = async (id: string) => {
  // const { data } = await AXIOS.get(`/api/categories/${id}`);
  // return data;

  await connectToDB();
    
  const category = await Category
    .findById(id)
    .select('-__v');

  return {
    data: category,
    error: null,
    message: '',
  } as any;
};