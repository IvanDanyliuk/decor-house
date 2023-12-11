'use server'

import bcrypt from 'bcryptjs';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import User from '../models/user.model'
import { utapi } from '../uploadthing';


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


export const getCurrentUser = async (email: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({ email });

    return {
      data: user,
      error: null,
      message: '',
    };
  } catch (error: any) {
    return { 
      data: null,
      error: error.message,
      message: 'User not found',
    };
  }
}

export const register = async (prevState: any, formData: FormData) => {
  const name = formData.get('name');
  const phone = formData.get('phone');
  const address = formData.get('address');
  const photo = formData.getAll('photo');
  const email = formData.get('email');
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword');

  try {
    await connectToDB();

    const validatedFields = userSchema.safeParse({
      name, phone, address, photo, email, password, confirmPassword
    });

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }
    
    const existingUser = await User.findOne({ email });

    if(existingUser) return { error: 'User already exists' };

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = new Blob(photo).size > 0 ? (await utapi.uploadFiles(photo))[0].data?.url : '';

    const newUser = await User.create({
      name,
      phone,
      address,
      photo: imageUrl,
      email,
      password: hashedPassword,
      role: 'user',
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