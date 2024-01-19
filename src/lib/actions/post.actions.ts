'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import { utapi } from '../uploadthing';
import Post from '../models/post.model';


const postSchema = zod.object({
  title: zod.string().min(1, 'Title is reqiured!'),
  image: zod.string().min(1, 'Post image is required!'),
  publicationDate: zod.string().min(1, 'Publication date is required!'),
  tags: zod.any(),
  content: zod.string().min(1, 'Content is required!'),
});


export const createPost = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const rawImage = formData.get('image') as string;
  const tags = formData.get('tags') as string;

  try {
    await connectToDB();

    const validatedFields = postSchema.safeParse({
      ...data, image: rawImage, tags: tags.split(', ')
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageFile = await fetch(rawImage);
    const image = await imageFile.blob();

    const imageUrl = new Blob([image]).size > 0 ? 
      (await utapi.uploadFiles([image]))[0].data?.url : 
      prevState.image;

    if(!imageUrl) return { error: 'Post Image is required' };

    await Post.create({
      ...data,
      image: imageUrl,
      tags: tags ? tags.split(', ') : [],
    });

    revalidatePath('/dashboard/posts');

    return {
      data: null,
      error: null,
      message: 'New Post has been successfully created!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new post',
    };
  }
};

export const updatePost = async (prevState: any, formData: FormData) => {
  const id = prevState._id;
  const data = Object.fromEntries(formData);
  const rawImage = formData.get('image') as string;
  const tags = formData.get('tags') as string;

  console.log('UPDATE POST', tags)

  try {
    await connectToDB();

    const validatedFields = postSchema.safeParse({
      ...data, image: rawImage, tags: tags.split(', ')
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const imageFile = await fetch(rawImage);
    const image = await imageFile.blob();

    const imageUrl = new Blob([image]).size > 0 && rawImage !== prevState.image ? 
      (await utapi.uploadFiles([image]))[0].data?.url : 
      prevState.image;

    if(!imageUrl) return { error: 'Post Image is required' };

    await Post.findByIdAndUpdate(id, {
      ...data,
      image: imageUrl,
      tags: tags ? tags.split(', ') : [],
    });

    revalidatePath('/dashboard/posts');

    return {
      data: null,
      error: null,
      message: 'Post has been successfully updated!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot update a post',
    };
  }
};

export const deletePost = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    const post = await Post.findById(id);
    const imageUrl = post.image.substring(post.image.lastIndexOf('/') + 1);

    await utapi.deleteFiles(imageUrl);

    await Post.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'Post has been successfully deleted!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot delete a post',
    };
  }
};