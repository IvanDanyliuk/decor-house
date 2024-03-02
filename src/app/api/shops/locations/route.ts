import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Shop from '@/lib/models/shop.model';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();
    
    const locations = await Shop.find().select('country');
    const countries = [...new Set(locations.map(item => item.country))];
    
    return NextResponse.json(countries);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};