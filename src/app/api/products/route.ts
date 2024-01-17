import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Manufacturer from '@/lib/models/manufacturer.model';
import Category from '@/lib/models/category.model';
import { removeFalsyObjectFields } from '@/utils/helpers';


export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get('page');
    const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');
    const category = req.nextUrl.searchParams.get('category');
    const manufacturer = req.nextUrl.searchParams.get('manufacturer');

    const params = removeFalsyObjectFields({ category, manufacturer });

    await connectToDB();

    const products = (page && itemsPerPage) ? 
      await Product
        .find(params)
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate([
          { path: 'category', select: 'name', model: Category },
          { path: 'manufacturer', model: Manufacturer }
        ])
        .select('-__v') :
      await Product
        .find(params)
        .populate([
          { path: 'category', select: 'name', model: Category },
          { path: 'manufacturer', model: Manufacturer }
        ])
        .select('-__v');
        
    const count = await Product.countDocuments();

    return NextResponse.json({
      data: {
        products,
        count,
      },
      error: null,
      message: ''
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};