import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Manufacturer from '@/lib/models/manufacturer.model';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage');
    const category = url.searchParams.get('category');
    const manufacturer = url.searchParams.get('manufacturer');

    console.log('GET PRODUCTS QUERY', req.json())

    await connectToDB();

    const products = (page && itemsPerPage) ? 
      await Product
        .find({})
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate([
          { path: 'category', select: 'name', model: Category },
          { path: 'manufacturer', model: Manufacturer }
        ])
        .select('-__v') :
      await Product
        .find({})
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