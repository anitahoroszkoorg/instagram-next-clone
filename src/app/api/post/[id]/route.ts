import { getPostDetails } from "@/app/db/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (id && typeof id === "string") {
    const postDetails = await getPostDetails(id);
    return NextResponse.json({ postDetails }, { status: 200 });
  }
}
