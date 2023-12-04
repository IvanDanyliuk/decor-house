import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';


export const POST = async (req: Request) => {
  try {
    const { name, phone, address, photo, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return new NextResponse('User with such email already exists', { status: 400 })
    }

    const user = await User.create({ name, phone, address, photo, email, password: hashedPassword, role: 'user', cart: [] });
    
    return new NextResponse('User has been successfully registered!', { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};