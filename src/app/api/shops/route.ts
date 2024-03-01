import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Shop from '@/lib/models/shop.model';


export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');
    const country = req.nextUrl.searchParams.get('country');

    const query = country ? { country } : {};

    await connectToDB();

    const shops = (page && itemsPerPage) ? 
      await Shop
        .find(query)
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .select('-__v') :
      await Shop
        .find(query)
        .sort({ 'createdAt': -1 })
        .select('-__v');

    const count = await Shop.countDocuments();

    return NextResponse.json({
      data: {
        shops,
        count,
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};