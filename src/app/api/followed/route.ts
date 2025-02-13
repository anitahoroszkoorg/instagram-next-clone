import { removeFollower } from "@/app/db/follow";
import { getUserId } from "@/app/db/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { user_id } = await req.json();
    if (!user_id) {
      return NextResponse.json({ message: "Missing user_id" }, { status: 400 });
    }
    const id = await getUserId(session.user.email);
    if (!id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    await removeFollower(user_id, id);
    return NextResponse.json(
      { message: "Unfollowed successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
