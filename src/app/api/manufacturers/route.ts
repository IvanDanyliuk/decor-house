import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Manufacturer from '@/lib/models/manufacturer.model';


export const GET = async (req: Request) => {
  try {
    // const params = await req.json();

    await connectToDB();

    const manufacturers = await Manufacturer.find({});
    return NextResponse.json(manufacturers);

    // if(params.id) {
    //   const manufacturer = await Manufacturer.findById(params.id);
    //   return NextResponse.json(manufacturer);
    // } else {
    //   const manufacturers = await Manufacturer.find({});
    //   return NextResponse.json(manufacturers);
    // }
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { name, country } = await req.json();

    await connectToDB();

    await Manufacturer.create({ name, country });

    return new NextResponse('Manufacturer has been created successfully!', { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};