import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Order from '@/lib/models/order.model';
import Product from '@/lib/models/product.model';
import User from '@/lib/models/user.model';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const email = req.nextUrl.searchParams.get('email');

    await connectToDB();

    const user = await User.findOne({ email }).select('-__v');
    const orders = await Order.find({ 'user.email': email }).populate({ path: 'products.product', select: '-__v', model: Product }).select('-__v');

    return NextResponse.json({
      profile: user,
      orders
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};