import mongoose from 'mongoose';
import { connectToDB } from "@/lib/database";
import Product from "@/lib/models/product.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Category from '@/lib/models/category.model';


export const GET = async (req: NextRequest) => {
  const email = req.nextUrl.searchParams.get('email');
  const limit = req.nextUrl.searchParams.get('limit');
  const category = req.nextUrl.searchParams.get('categoryId');

  try {
    await connectToDB();

    const user = await User.findOne({ email }).populate({ path: 'viewed', model: Product });
    const userViewedProductIds = user.viewed;
    
    const query = category ? [
      { $sample: { size: +limit! } },
      { $project: { '__v': 0 } },
      { $match: { category: new mongoose.Types.ObjectId(category) } },
    ] : [
      { $sample: { size: +limit! } },
      { $project: { '__v': 0 } },
    ];

    const popular = await Product.aggregate(query).limit(+limit!);
    await Product.populate(popular, { path: 'category', model: Category });

    const viewed = await Product
      .find({ _id: { $in: userViewedProductIds } })
      .populate({ path: 'category', model: Category })
      .select('-__v');

    return NextResponse.json({
      popular,
      viewed
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};