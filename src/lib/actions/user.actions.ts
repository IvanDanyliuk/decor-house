'use server';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import User from '../models/user.model'
import { utapi } from '../uploadthing';
import { revalidatePath } from 'next/cache';
import { ICartItem } from '../types/user.types';
import { signIn } from 'next-auth/react';


const userSchema = zod.object({
  name: zod.string().min(1, 'Name is required!').max(100),
  phone: zod.string(),
  address: zod.string(),
  email: zod.string().min(1, 'Email is required!').email('Invalid email!'),
  password: zod.string().min(1, 'Password is required!').min(6, 'Password must have 6 characters'),
  confirmPassword: zod.string().min(1, 'Password confirmation is required!'),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

const newPasswordSchema = zod.object({
  currentPassword: zod.string().min(1, 'Enter your current password'),
  newPassword: zod.string().min(1, 'Enter your new password'),
  confirmPassword: zod.string().min(1, 'Confirm your new password'),
}).refine(data => data.newPassword === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});


export const register = async (prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const phone = formData.get('phone');
  const address = formData.get('address');
  const rawPhoto = formData.get('photo') as string;
  const email = formData.get('email');
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword');

  try {
    await connectToDB();

    const validatedFields = userSchema.safeParse({
      name, phone, address, photo: rawPhoto, email, password, confirmPassword
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const photoFile = await fetch(rawPhoto);
    const photo = await photoFile.blob();
    
    const existingUser = await User.findOne({ email });

    if(existingUser) return { error: 'User already exists' };

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = new Blob([photo]).size > 0 ? (await utapi.uploadFiles([photo]))[0].data?.url : '';

    const newUser = await User.create({
      name,
      phone,
      address,
      photo: imageUrl,
      email,
      password: hashedPassword,
      role: 'user',
      viewed: [],
      productCart: [],
    });

    return {
      data: {
        email: newUser.email,
        password: newUser.password
      },
      error: null,
      message: 'User has been successfully created!',
    };
  } catch (error) {
    return {
      error: 'Failed to register',
    };
  }
};

export const updateUser = async (prevState: any, formData: FormData) => {
  const data = Object.fromEntries(formData);

  try {
    await connectToDB();

    await User.findByIdAndUpdate(data.id, {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
    });

    if(prevState.email !== data.email) {
      await signIn('credentials', { email: data.email, callbackUrl: '/profile' });
    }
    
    revalidatePath(`/profile/${prevState._id}`);
    
    return {
      data: {},
      error: null,
      message: 'User has been successfully updated!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot update the user data',
    }
  }
};

export const updateUserPhoto = async (prevState: any, formData: FormData) => {
  try {
    const data = Object.fromEntries(formData);
    const rawImage = formData.get('photo') as string;

    if(!rawImage) return { error: 'User photo is required' };

    await connectToDB();

    const imageFile = await fetch(rawImage);
    const image = await imageFile.blob();

    const user = await User.findById(data.id);

    const photoUrl = new Blob([image]).size > 0 ? 
      (await utapi.uploadFiles([image]))[0].data?.url : 
      prevState.photo;

    if(photoUrl !== user.photo) {
      const imageToDelete = user.photo.substring(user.photo.lastIndexOf('/') + 1);
      await utapi.deleteFiles(imageToDelete);
    }

    await User.findByIdAndUpdate(data.id, { $set: { photo: photoUrl } });
    revalidatePath(`/profile/${prevState._id}`);

    return {
      data: null,
      error: null,
      message: 'User photo has been successfully updated!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot update the user photo',
    }
  }
};

export const updatePassword = async (prevState: any, formData: FormData) => {
  try {
    const data = Object.fromEntries(formData);

    const validatedFields = newPasswordSchema.safeParse({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const user = await User.findById(data.id);
    const isPasswordMatch = await bcrypt.compare(data.currentPassword as string, user!.password);

    if(!isPasswordMatch) {
      throw new Error('Passwords do not match!');
    }

    await connectToDB();

    const hashedNewPassword = await bcrypt.hash(data.newPassword as string, 10);
    await User.findByIdAndUpdate(data.id, { $set: { password: hashedNewPassword } });
    revalidatePath('/profile');

    return {
      data: null,
      error: null,
      message: 'User photo has been successfully updated!',
    };
  } catch (error: any) {
    
  }
}

export const deleteUser = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    const user = await User.findById(id);
    const photoUrl = user.photo.substring(user.photo.lastIndexOf('/') + 1);

    await utapi.deleteFiles(photoUrl);

    await User.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'User has been successfully deleted!',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot delete a user',
    };
  }
};

export const viewProduct = async (email: string, productId: string) => {
  try {
    await connectToDB();

    const viewedProductId = new mongoose.Types.ObjectId(productId)
    const user = await User.findOne({ email });
    const isProductViewed = user.viewed.includes(viewedProductId);

    if(isProductViewed) {
      const modifiedViewedProducts = user.viewed.filter((id: any) => id.toString() !== productId);
      modifiedViewedProducts.unshift(productId);
      await User.findByIdAndUpdate(user._id, { $set: { viewed: modifiedViewedProducts } });
      return 'User has been modified';
    } else {
      const modifiedViewedProducts = user.viewed.slice(0, 9);
      modifiedViewedProducts.unshift(productId);
      await User.findByIdAndUpdate(user._id, { $set: { viewed: modifiedViewedProducts } });
      return 'User has been modified';
    }
  } catch (error: any) {
    return error.message;
  }
};

export const updateCart = async (email: string, cartData: ICartItem[]) => {
  try {
    await connectToDB();
    await User.findOneAndUpdate({ email }, { $set: { 'cart': cartData } });
    return 'Cart has been updated';
  } catch (error: any) {
    return error.message;
  }
};