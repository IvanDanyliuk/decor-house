import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Post from '@/lib/models/post.model';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage');

    await connectToDB();

    const posts = (page && itemsPerPage) ? 
      await Post
        .find({})
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page -1) * +itemsPerPage)
        .populate({ path: 'tags', select: '-__v', model: Category })
        .select('-__v') : 
      await Post
        .find({})
        .sort({ 'createdAt': -1 })
        .populate({ path: 'tags', select: '-__v', model: Category })
        .select('-__v');

    const count = await Post.countDocuments();

    return NextResponse.json({
      data: {
        posts,
        count,
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}