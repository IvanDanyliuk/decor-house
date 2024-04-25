import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Manufacturer from '@/lib/models/manufacturer.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const isProductIdValid = mongoose.Types.ObjectId.isValid(params.id);

    const product = isProductIdValid ? 
      await Product
        .findById(params.id)
        .populate({ path: 'manufacturer', model: Manufacturer })
        .select('-__v') :
      null;

    return NextResponse.json(product);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};