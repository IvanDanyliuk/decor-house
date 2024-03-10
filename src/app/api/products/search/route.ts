import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    return NextResponse.json({
      data: {
        products: [],
        count: 10,
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};