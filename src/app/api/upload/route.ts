import { addPost } from "@/app/services/addPost";
import { validateUploadPostData } from "@/app/schemas/uploadPostSchema";
export const POST = async (request: Request) => {
  const formData = await request.formData();
  const { error, values } = validateUploadPostData(formData);
  if (error) {
    return new Response(error, { status: 400 });
  }
  await addPost(values.image as File, values.caption as string);
  return new Response(JSON.stringify(values), { status: 200 });
};
