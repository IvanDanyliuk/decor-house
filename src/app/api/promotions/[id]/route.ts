import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Promotion from '@/lib/models/promotion.model';
import Product from '@/lib/models/product.model';
import mongoose from 'mongoose';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const isPromotionIdValid = mongoose.Types.ObjectId.isValid(params.id);
    
    const promotion = isPromotionIdValid ? 
      await Promotion
        .findById(params.id)
        .populate({ path: 'products', model: Product })
        .select('-__v') : 
      null;

    return NextResponse.json({
      data: promotion,
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};