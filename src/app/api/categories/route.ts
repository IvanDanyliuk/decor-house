import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage');

    await connectToDB();

    const categories = (page && itemsPerPage) ? 
      await Category
        .find({})
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .select('-__v') :
      await Category
        .find({})
        .sort({ 'createdAt': -1 })
        .select('-__v');

    const count = await Category.countDocuments();

    return NextResponse.json({
      data: {
        categories, 
        count
      },
      error: null,
      message: '',
    })
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};