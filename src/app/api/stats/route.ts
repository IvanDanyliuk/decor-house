import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Category from '@/lib/models/category.model';
import Order from '@/lib/models/order.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const category = req.nextUrl.searchParams.get('categoryId');
    const periodFrom = req.nextUrl.searchParams.get('periodFrom');
    const periodTo = req.nextUrl.searchParams.get('periodTo');

    const query = {
      createdAt: { $gte: periodFrom, $lte: periodTo }
    };

    await connectToDB();

    const categories = await Category.find({}).select('-__v');
    const orders = await Order.find(query).populate({ path: 'products.product', model: Product });

    const earnings = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const averageBill = Math.round(earnings / orders.length);
    const productsSoldData = orders.map(item => item.products).flat();
    const productsSold = categories.map(category => {
      const products = productsSoldData.filter(product => product.product.category.toString() === category._id.toString());
      const amountPerCategory = products.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
      return {
        name: category.name,
        percentage: Math.round(amountPerCategory / earnings * 100)
      };
    });
    
    return NextResponse.json({
      total: {
        earnings,
        ordersCount: orders.length,
        averageBill,
      },
      productsSold

    })
  } catch (error: any) {
    return new NextResponse(error, { status: 500 })
  }
};