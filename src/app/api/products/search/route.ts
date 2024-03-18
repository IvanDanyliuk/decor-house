import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams);
    
    await connectToDB();

    const products = await Product.aggregate([
      // {
      //   $unwind: '$category'
      // },  
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
          $or: [
            { 'category.name': { $regex: query.query, $options: 'i' } },
            { name: { $regex: query.query, $options: 'i' } },
            { 'category.name': query.category }
          ]
        }
      },
    ])



    console.log('GET SEARCH PRODUCTS', products)

    return NextResponse.json({
      data: {
        products,
        count: 10,
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};