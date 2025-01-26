import { addComment, deleteComment } from "@/app/db/comment";
import { getUserId } from "@/app/db/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession();
  const email = session?.user?.email;
  const { post_id, comment_text } = await req.json();
  console.log(comment_text);
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
        await addComment(post_id, id, comment_text);
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

export const DELETE = async (req: Request) => {
  const { comment_id } = await req.json();
  try {
    await deleteComment(comment_id);
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
};
