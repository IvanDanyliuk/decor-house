import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Promotion from '@/lib/models/promotion.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage');

    await connectToDB();

    const promotions = (page && itemsPerPage) ? 
      await Promotion
        .find({})
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate({ path: 'products', model: Product })
        .select('-__v') :
      await Promotion
        .find({})
        .sort({ 'createdAt': -1 })
        .populate({ path: 'products', model: Product })
        .select('-__v');

    const count = await Promotion.countDocuments();

    return NextResponse.json({
      data: {
        promotions, 
        count
      },
      error: null,
      message: '',
    })
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};