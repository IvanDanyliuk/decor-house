import { connectToDB } from "@/lib/database";
import User from "@/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get('id');

    await connectToDB();

    const user = await User.findById(userId);

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};