import { getAllPostsByFollowedUsers } from "@/app/db/posts";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession();
    const email = session?.user?.email;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const pageSize = 5;
    const allPosts = await getAllPostsByFollowedUsers(email);
    let paginatedPosts = allPosts;
    if (cursor) {
      const cursorIndex = allPosts.findIndex((post) => post.post_id === cursor);
      paginatedPosts =
        cursorIndex !== -1 ? allPosts.slice(cursorIndex + 1) : [];
    }
    paginatedPosts = paginatedPosts.slice(0, pageSize);

    const nextCursor =
      paginatedPosts.length === pageSize
        ? paginatedPosts[paginatedPosts.length - 1].post_id
        : null;

    return NextResponse.json(
      { posts: paginatedPosts, nextCursor },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
