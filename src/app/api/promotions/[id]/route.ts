import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Promotion from '@/lib/models/promotion.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    
    const promotion = await Promotion
      .findById(params.id)
      .populate({ path: 'products', model: Product })
      .select('-__v');

    return NextResponse.json({
      data: promotion,
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};