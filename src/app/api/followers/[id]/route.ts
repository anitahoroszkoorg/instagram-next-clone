import { getFollowers } from "@/app/db/follow";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json(
      { message: "User ID is missing" },
      { status: 400 },
    );
  }
  try {
    const followers = await getFollowers(id);
    return NextResponse.json({ followers }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
