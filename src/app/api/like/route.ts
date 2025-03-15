import { addLike, deleteLike } from "@/app/db/like";
import { getUserId } from "@/app/db/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const { post_id } = await req.json();

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
    if (!id || !post_id) {
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
        await addLike(post_id, id);
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
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    throw new Error("No email present");
  }
  const { post_id } = await req.json();
  const id = await getUserId(email);
  if (!id || !post_id) {
    return NextResponse.json(
      {
        message: "Missing data",
      },
      {
        status: 200,
      },
    );
  } else {
    try {
      await deleteLike(post_id, id);
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
          status: 500,
        },
      );
    }
  }
}
