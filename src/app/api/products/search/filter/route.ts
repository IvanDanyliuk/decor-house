import { connectToDB } from '@/lib/database';
import Category from '@/lib/models/category.model';
import Manufacturer from '@/lib/models/manufacturer.model';
import Product from '@/lib/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await connectToDB();

    const categories = await Category.find({}).select('-__v');
    const manufacturers = await Manufacturer.find({}).select('-__v');
    const minPriceProduct: any = await Product.find({}).sort({ price: 1 }).limit(1);
    const maxPriceProduct: any = await Product.find({}).sort({ price: -1 }).limit(1);

    return NextResponse.json({
      data: {
        categories,
        manufacturers,
        minPrice: minPriceProduct[0].price,
        maxPrice: maxPriceProduct[0].price,
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};