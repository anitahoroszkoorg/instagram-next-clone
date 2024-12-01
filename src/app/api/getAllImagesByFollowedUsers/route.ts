import { getAllPostsByFollowedUsers } from "@/app/db/posts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (email && typeof email === "string") {
    const posts = await getAllPostsByFollowedUsers(email);
    return NextResponse.json({ posts }, { status: 200 });
  }
}
