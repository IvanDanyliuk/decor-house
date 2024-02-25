import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import Product from "@/lib/models/product.model";
import User from "@/lib/models/user.model";


export const GET = async (req: NextRequest) => {
  try {
    const email = req.nextUrl.searchParams.get('email');

    await connectToDB();

    const user = await User
      .findOne({ email })
      .populate([
        { path: 'viewed', model: Product },
        { path: 'cart', populate: 'product', model: Product },
      ])
      .select('-password -__v');

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};