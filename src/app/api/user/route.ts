import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');

    await connectToDB();

    const user = await User.findOne({ email }).select('-password -__v');
    return NextResponse.json(user);
  } catch (error: any) {
    
  }
}