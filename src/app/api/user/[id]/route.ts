import { connectToDB } from "@/lib/database";
import Product from "@/lib/models/product.model";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get('id');

    await connectToDB();

    const user = await User
      .findById(userId)
      .populate({ path: 'viewed', model: Product })
      .select('-password -__v');

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};