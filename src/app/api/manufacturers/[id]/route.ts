import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Manufacturer from '@/lib/models/manufacturer.model';


export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const manufacturer = await Manufacturer
        .findById(params.id)
        .select('-__v');

    return NextResponse.json({
      data: manufacturer,
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};
