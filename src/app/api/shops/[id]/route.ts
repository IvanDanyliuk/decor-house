import { connectToDB } from "@/lib/database";
import Shop from "@/lib/models/shop.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();

    const shop = await Shop
      .findById(params.id)
      .select('-__v');

    return NextResponse.json({
      data: shop,
      error: null,
      message: '',
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};