import { followUser, getFollowers, removeFollow } from "@/app/db/follow";
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

export const DELETE = async (req: Request) => {
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
        await removeFollow(user_id, id);
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
};
