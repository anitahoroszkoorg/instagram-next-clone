import { getAllPosts } from "@/app/db/posts";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const posts = await getAllPosts();
  return NextResponse.json({ posts }, { status: 200 });
}
