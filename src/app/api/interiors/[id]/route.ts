import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDB } from '@/lib/database';
import Interior from '@/lib/models/interior.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const isInteriorIdValid = mongoose.Types.ObjectId.isValid(params.id);

    const interior = isInteriorIdValid ? 
      await Interior
        .findById(params.id)
        .populate({ path: 'products', model: Product })
        .select('-__v') : 
      null;

    return NextResponse.json({
      data: interior,
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};