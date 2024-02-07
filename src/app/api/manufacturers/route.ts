import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Manufacturer from '@/lib/models/manufacturer.model';


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage');

    await connectToDB();

    const manufacturers = (page && itemsPerPage) ? 
      await Manufacturer
        .find({})
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .select('-__v') : 
      await Manufacturer
        .find({})
        .sort({ 'createdAt': -1 })
        .select('-__v');

    const count = await Manufacturer.countDocuments();

    return NextResponse.json({
      data: {
        manufacturers,
        count, 
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
