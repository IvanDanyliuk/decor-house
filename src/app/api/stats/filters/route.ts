import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Category from '@/lib/models/category.model';
import Order from '@/lib/models/order.model';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    const categoriesData = await Category.find({}).select('-__v');
    const categories = categoriesData.map(category => ({ label: category.name, value: category._id }));
    const orders = await Order.find({}).sort({ createdAt: 1 });
    const periodFrom = orders.length > 0 ? orders[0].createdAt : new Date().toISOString();
    const periodTo = orders.length > 0 ? orders[orders.length - 1].createdAt : new Date().toISOString();

    return NextResponse.json({
      categories,
      periodFrom,
      periodTo
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};