'use server';

import { revalidatePath } from 'next/cache';
import { z as zod } from 'zod';
import { connectToDB } from '../database';
import Order from '../models/order.model';


const orderSchema = zod.object({
  name: zod.string().min(1, 'Customer name is required'),
  phone: zod.string().min(1, 'Phone is required'),
  email: zod.string().min(1, 'Email is required'),
  paymentMethod: zod.string().min(1, 'Payment method is required'),
  comment: zod.string(),
  deliveryAddress: zod.string().min(1, 'Delivery address is required'),
  deliveryMethod: zod.string().min(1, 'Delivery method is required'),
});


export const createOrder = async (details: any, prevState: any, formData: FormData) => {
  try {
    const data = Object.fromEntries(formData);

    await connectToDB();

    const validatedFields = orderSchema.safeParse(data);

    if(!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    await Order.create({
      user: {
        name: data.name,
        phone: data.phone,
        email: data.email,
      },
      products: JSON.parse(details.products),
      totalAmount: +details.totalAmount,
      deliveryAddress: data.deliveryAddress,
      deliveryMethod: data.deliveryMethod,
      deliveryStatus: details.deliveryStatus,
      paymentMethod: data.paymentMethod,
      paymentStatus: details.paymentStatus,
    });

    revalidatePath('/dashboard/orders');

    return {
      data: null,
      error: null,
      message: 'A new order has been successfully created',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot create a new order',
    };
  }
};

export const deleteOrder = async ({ id, path }: { id: string, path: string }) => {
  try {
    await connectToDB();

    await Order.findByIdAndDelete(id);

    revalidatePath(path);

    return {
      data: null,
      error: null,
      message: 'Order has been successfully deleted',
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
      message: 'Cannot delete an order',
    };
  }
};