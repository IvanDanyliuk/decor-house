import { connectToDB } from "@/lib/database";
import Product from "@/lib/models/product.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  const email = req.nextUrl.searchParams.get('email');
  const limit = req.nextUrl.searchParams.get('limit');

  try {
    await connectToDB();

    const user = await User.findOne({ email }).populate({ path: 'viewed', model: Product });
    const userViewedProductIds = user.viewed;

    const popular = await Product.aggregate([
      { $sample: { size: +limit! } },
      { $project: { '__v': 0 } }
    ]);

    const viewed = await Product
      .find({ _id: { $in: userViewedProductIds } })
      .select('-__v');

    return NextResponse.json({
      popular,
      viewed
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};