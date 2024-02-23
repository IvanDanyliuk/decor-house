import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import User from '@/lib/models/user.model';
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest) => {
  const email = req.nextUrl.searchParams.get('email');
  const limit = req.nextUrl.searchParams.get('limit');
  const category = req.nextUrl.searchParams.get('categoryId');

  try {
    await connectToDB();

    const user = email ? await User.findOne({ email }).populate({ path: 'viewed', model: Product }) : null;
    
    const query = category ? [
      { $sample: { size: +limit! } },
      { $project: { '__v': 0 } },
      { $match: { category: new mongoose.Types.ObjectId(category) } },
    ] : [
      { $sample: { size: +limit! } },
      { $project: { '__v': 0 } },
    ];

    const related = await Product.aggregate(query).limit(+limit!);
    await Product.populate(related, { path: 'category', model: Category });

    const viewed = user ? 
      await Product
        .find({ _id: { $in: user.viewed } })
        .populate({ path: 'category', model: Category })
        .select('-__v') : 
      [];

    return NextResponse.json({
      related,
      viewed
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};