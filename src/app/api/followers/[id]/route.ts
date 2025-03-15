import { getFollowers, removeFollow } from "@/app/db/follow";
import { getUserId } from "@/app/db/users";
import { getServerSession } from "next-auth";
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const id = await getUserId(session.user.email);
    if (!id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await removeFollow(params.id, id);

    return NextResponse.json(
      { message: "Unfollowed successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
