import { addPost } from "@/app/services/addPost";

export const POST = async (request: Request) => {
  const data = await request.formData();
  // Use library to validate
  const blob = data.get("image");
  const caption = data.get("caption");
  if (typeof blob === "string" || !blob) {
    return new Response("Bad Request", { status: 400 });
  }
  if (typeof caption !== "string" || !blob) {
    return new Response("Bad Request", { status: 400 });
  }
  //
  addPost(blob, caption);

  return new Response("Created", { status: 201 });
};
