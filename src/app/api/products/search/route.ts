import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Category from '@/lib/models/category.model';
import { removeFalsyObjectFields } from '@/utils/helpers';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams);

    const params: any = Object.values(removeFalsyObjectFields({
      query: {
        $or: [
          { 'category.name': { $regex: query.query, $options: 'i' } },
          { name: { $regex: query.query, $options: 'i' } },
        ]
      },
      category: query.category ? { 'category.name': { $regex: query.category, $options: 'i' } } : null,
      types: query.types ? { type: { $in: query.types.split(';') } } : null,
      manufacturer: query.manufacturer ? { manufacturer: { $in: query.manufacturers.split(';') } } : null
    }));
    
    await connectToDB();

    const products = await Product.aggregate([
      {
        $lookup: {
          from: Category.collection.name,
          localField: 'category',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $match: {
          $and: [
            ...params
          ]
        }
      },
    ])

    return NextResponse.json({
      data: {
        products,
        count: products.length,
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};