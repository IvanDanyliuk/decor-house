import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Category from '@/lib/models/category.model';
import { removeFalsyObjectFields } from '@/utils/helpers';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const query = Object.fromEntries(req.nextUrl.searchParams);
    const itemsLimit = Number(query.itemsPerPage);
    const itemsToSkip = (Number(query.page) - 1) * Number(query.itemsPerPage);

    const params: any = Object.values(removeFalsyObjectFields({
      query: {
        $or: [
          { 'category.name': { $regex: query.query, $options: 'i' } },
          { name: { $regex: query.query, $options: 'i' } },
        ]
      },
      category: query.category ? { 'category.name': { $regex: query.category, $options: 'i' } } : null,
      types: query.types ? { type: { $in: query.types.split(';') } } : null,
      manufacturer: query.manufacturers ? { manufacturer: { $in: query.manufacturers.split(';').map(item => new mongoose.Types.ObjectId(item)) } } : null,
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
      {
        $sort: {
          [query.sortIndicator]: query.order === 'asc' ? 1 : -1
        }
      },
      {
        $facet: {
          products: [
            {
              $skip: itemsToSkip
            },
            {
              $limit: itemsLimit
            },
          ],
          count: [
            {
              $count: 'count'
            }
          ]
        }
      }
    ]);

    return NextResponse.json({
      data: {
        products: products[0].products,
        count: products[0].count[0].count
      },
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 200 });
  }
};