import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const product = await Product
      .findById(params.id)
      .select('-__v');

    return NextResponse.json(product);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};