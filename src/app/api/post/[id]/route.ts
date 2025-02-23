import { getPostDetails, updatePostInDb } from "@/app/db/posts";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, caption } = body;

    if (!id || !caption) {
      return NextResponse.json(
        { message: "ID and caption are required" },
        { status: 400 },
      );
    }
    const updatedPost = await updatePostInDb(id, { caption });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error: any) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

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
