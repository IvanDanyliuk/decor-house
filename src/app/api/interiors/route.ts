import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Interior from '@/lib/models/interior.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage');

    await connectToDB();

    const interiors = (page && itemsPerPage) ? 
      await Interior
        .find({})
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate({ path: 'products', select: '-__v', model: Product })
        .select('-__v') :
      await Interior
        .find({})
        .populate({ path: 'products', select: '-__v', model: Product })
        .select('-__v');
    
    const count = await Interior.countDocuments();

    return NextResponse.json({
      data: {
        interiors,
        count,
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};