import { connectToDB } from "@/lib/database";
import Product from "@/lib/models/product.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('userId');
  const limit = req.nextUrl.searchParams.get('limit');

  try {
    await connectToDB();

    const user = await User.findById(userId);
    const userViewedProductIds = user.viewed;

    const popularProducts = await Product.aggregate([
      { $sample: { size: +limit! } },
      { $project: { '__v': 0 } }
    ]);

    const viewedProducts = await Product
      .find({ _id: { $in: userViewedProductIds } })
      .select('-__v');

    return NextResponse.json({
      popularProducts,
      viewedProducts
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};