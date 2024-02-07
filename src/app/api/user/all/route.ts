import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';


export const GET =async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage');

    await connectToDB();

    const users = (page && itemsPerPage) ? 
      await User
        .find({})
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .select('-__v') : 
      await User
        .find({})
        .sort({ 'createdAt': -1 })
        .select('-__v');
    
    const count = await User.countDocuments();

    return NextResponse.json({
      data: {
        users,
        count,
      }, 
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};