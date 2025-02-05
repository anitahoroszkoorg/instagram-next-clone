import { addPost } from "@/app/services/addPost";
import { validateUploadPostData } from "@/app/schemas/uploadPostSchema";
import Joi from "joi";
import { getServerSession } from "next-auth";
import { getUserId } from "@/app/db/users";

const formDataToObject = (formData: FormData) => {
  const obj: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

const extractJoiErrors = (error: Joi.ValidationError): string => {
  return error.details.map((detail) => detail.message).join(", ");
};

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    throw new Error("No email present");
  }
  const id = await getUserId(email);
  const formValues = formDataToObject(formData);

  const { error, values } = validateUploadPostData(formValues);
  if (error) {
    const errorMessage = extractJoiErrors(error);
    return new Response(errorMessage, { status: 400 });
  }

  const image = formValues.image as File;
  if (!image) {
    return new Response("Image is required.", { status: 400 });
  }

  const { error: imageError } = validateImage(image);
  if (imageError) {
    return new Response(imageError, { status: 400 });
  }

  const imageBuffer = Buffer.from(await image.arrayBuffer());
  await addPost(imageBuffer, values.caption, id);
  return new Response(JSON.stringify(values), { status: 200 });
};

const validateImage = (image: File) => {
  const allowedTypes = ["image/png", "image/jpeg"];
  if (!allowedTypes.includes(image.type)) {
    return { error: "Invalid image type. Only PNG and JPEG are allowed." };
  }
  if (image.size > 5 * 1024 * 1024) {
    return { error: "Image size exceeds 5MB." };
  }
  return { error: null };
};
