import { AXIOS } from '../axios';
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
  // const { data } = await AXIOS.get(
  //   '/api/user/all', 
  //   { params: { page, itemsPerPage } }
  // );
  // return data;

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
  // const { data } = await AXIOS.get(
  //   `/api/users/${id}`,
  //   { params: { id } }
  // );
  // return data;

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
  // const { data } = await AXIOS.get(
  //   '/api/user/current',
  //   { params: { email } }
  // );
  // return data;

  await connectToDB();

  const user = await User.findOne({ email }).select('-password -__v');

  return user as any;
};

export const getProfileData = async (id: string) => {
  // const { data } = await AXIOS.get(
  //   '/api/user/profile',
  //   { params: { id } }
  // );
  // return data;

  await connectToDB();

  const user = await User
    .findById(id)
    .select('-__v');
    
  const orders = await Order
    .find({ 'user.email': user.email })
    .populate({ path: 'products.product', select: '-__v', model: Product })
    .select('-__v')
    .lean();

  return {
    profile: user,
    orders
  } as any;
};