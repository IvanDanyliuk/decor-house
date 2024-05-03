'use server';

import { cache } from 'react';
import mongoose from 'mongoose';
import { connectToDB } from '../database';
import Category from '../models/category.model';
import Post from '../models/post.model';


export const getPosts = async ({ 
  page, 
  itemsPerPage, 
  tags
}: { 
  page?: number;
  itemsPerPage?: number;
  tags?: string;
}) => {
  const query = tags ? { tags: { $in: tags.split(', ') } } : {};

  await connectToDB();

  const posts = (page && itemsPerPage) ? 
    await Post
      .find(query)
      .sort({ 'createdAt': -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .populate({ path: 'tags', select: '-__v', model: Category })
      .select('-__v')
      .lean() : 
    await Post
      .find(query)
      .sort({ 'createdAt': -1 })
      .populate({ path: 'tags', select: '-__v', model: Category })
      .select('-__v')
      .lean();

  const count = await Post.countDocuments(query);

  return {
    data: {
      posts,
      count,
    },
    error: null,
    message: '',
  } as any;
};

export const getPost = cache(async (id: string) => {
  await connectToDB();

  const isPostIdValid = mongoose.Types.ObjectId.isValid(id);

  const post = isPostIdValid ? 
    await Post
      .findById(id)
      .populate({ path: 'tags', model: Category })
      .select('-__v')
      .lean() :
    null;

  return {
    data: post,
    error: null,
    message: '',
  } as any;
});