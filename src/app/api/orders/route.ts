import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Order from '@/lib/models/order.model';
import Product from '@/lib/models/product.model';


export const GET = async(req: NextRequest, res: NextResponse) => {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');
    const email = req.nextUrl.searchParams.get('email');

    const query = email ? { 'user.email': email } : {};

    await connectToDB();

    const orders = (page && itemsPerPage) ? 
      await Order
        .find(query)
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate({ path: 'products', model: Product })
        .select('-__v') :
      await Order
        .find(query)
        .sort({ 'createdAt': -1 })
        .populate({ path: 'products', model: Product })
        .select('-__v');
      
      const count = await Order.countDocuments();

      return NextResponse.json({
        orders,
        count
      });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};