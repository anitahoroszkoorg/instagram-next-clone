import { getAllFollowedPosts } from "@/app/db/posts";
import { getUserId } from "@/app/db/users";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  const prisma = new PrismaClient();
  const session = await getServerSession();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "No email present" }, { status: 400 });
  }

  try {
    const userId = await getUserId(email);
    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const posts = getAllFollowedPosts(userId);
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
