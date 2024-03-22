import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Promotion from '@/lib/models/promotion.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');
    const period = req.nextUrl.searchParams.get('period');

    const query = period === 'current' ? 
      { $and: [
        { periodFrom: { $lte: new Date().toISOString() } },
        { periodTo: { $gte: new Date().toISOString() } }
      ] } : 
        period === 'past' ? 
          { periodTo: { $lte: new Date().toISOString() } } :
          {};

    await connectToDB();

    const promotions = (page && itemsPerPage) ? 
      await Promotion
        .find(query)
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate({ path: 'products', model: Product })
        .select('-__v') :
      await Promotion
        .find(query)
        .sort({ 'createdAt': -1 })
        .populate({ path: 'products', model: Product })
        .select('-__v');

    const count = await Promotion.countDocuments(query);

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