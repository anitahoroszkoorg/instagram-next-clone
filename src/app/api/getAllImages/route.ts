import { getAllPosts } from "@/app/db/posts";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
