import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Manufacturer from '@/lib/models/manufacturer.model';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const categoryData = req.nextUrl.searchParams.get('category');
    const categoryPattern = new RegExp(`${categoryData?.replaceAll('-', ' ')}`);
    const category = await Category.findOne({ name: { $regex: categoryPattern, $options: 'i' } });

    const products = await Product.find({ category });
    const productManufacturers = products.map(item => item.manufacturer);
    const manufacturers = await Manufacturer.find({ _id: { $in: productManufacturers } });
    const prices: number[] = products.map(item => item.price);

    return NextResponse.json({
      types: [...new Set(category.types)],
      features: [...new Set(category.features)],
      manufacturers,
      price: {
        min: Math.min(...prices),
        max: Math.max(...prices)
      }
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};