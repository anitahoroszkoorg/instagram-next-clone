import { addLike, deleteLike } from "@/app/db/like";
import { getUserId } from "@/app/db/users";
import { getServerSession } from "next-auth";

export const POST = async (req: Request) => {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    throw new Error("No email present");
  }
  const { post_id } = await req.json();
  const id = await getUserId(email);
  if (!id || !post_id) {
    return new Response("Missing data", { status: 400 });
  } else {
    try {
      await addLike(post_id, id);
      return new Response("Success", { status: 200 });
    } catch (error: any) {
      return new Response(error.message, { status: 500 });
    }
  }
};

export const DELETE = async (req: Request) => {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    throw new Error("No email present");
  }
  const { post_id } = await req.json();
  const id = await getUserId(email);
  if (!id || !post_id) {
    return new Response("Missing data", { status: 400 });
  } else {
    try {
      await deleteLike(post_id, id);
      return new Response("Success", { status: 200 });
    } catch (error: any) {
      return new Response(error.message, { status: 500 });
    }
  }
};
