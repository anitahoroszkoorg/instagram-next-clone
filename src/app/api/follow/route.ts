import { followUser, removeFollow } from "@/app/db/follow";
import { getUserId } from "@/app/db/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const { user_id } = await req.json();
  if (!email) {
    return NextResponse.json(
      {
        message: "No email present",
      },
      {
        status: 400,
      },
    );
  } else {
    const id = await getUserId(email);
    if (!id || !user_id) {
      return NextResponse.json(
        {
          message: "Data is missing",
        },
        {
          status: 400,
        },
      );
    } else {
      try {
        await followUser(user_id, id);
        return NextResponse.json(
          {
            message: "ok",
          },
          {
            status: 200,
          },
        );
      } catch (error: any) {
        return NextResponse.json(
          {
            message: error.message,
          },
          {
            status: 400,
          },
        );
      }
    }
  }
}

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
    await removeFollow(user_id, id);

    return NextResponse.json(
      { message: "Unfollowed successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
