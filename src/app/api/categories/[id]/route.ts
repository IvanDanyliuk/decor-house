import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    
    const category = await Category
      .findById(params.id)
      .select('-__v');

    return NextResponse.json({
      data: category,
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};