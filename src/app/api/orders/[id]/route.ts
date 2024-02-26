import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Order from '@/lib/models/order.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = params.id;
    await connectToDB();
    
    const order = await Order
      .findById(id)
      .populate({ path: 'products', model: Product })
      .select('-__v');
    
    return NextResponse.json(order);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};