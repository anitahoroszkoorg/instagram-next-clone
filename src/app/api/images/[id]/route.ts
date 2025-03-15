import { getPostsByUserId } from "@/app/db/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (id && typeof id === "string") {
    const posts = await getPostsByUserId(id);
    return NextResponse.json({ posts }, { status: 200 });
  }
}
