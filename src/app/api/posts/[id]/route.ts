import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Post from '@/lib/models/post.model';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const post = await Post
      .findById(params.id)
      .populate({ path: 'tags', model: Category })
      .select('-__v');

    return NextResponse.json({
      data: post,
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};