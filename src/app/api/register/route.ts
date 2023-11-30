import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDB } from '@/lib/database';
import User from '@/lib/models/user.model';


export const POST = async (req: Request) => {
  try {
    const { name, phone, address, photo, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await connectToDB();

    const user = await User.create({ name, phone, address, photo, email, password: hashedPassword, role: 'user', cart: [] });
    console.log('USER', user)
    return NextResponse.json(user);
  } catch (error: any) {
    throw new Error(`Cannot create an account: ${error.message}`);
  }
};