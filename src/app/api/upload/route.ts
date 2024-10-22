import { addPost } from "@/app/services/addPost";
import { validateUploadPostData } from "@/app/schemas/uploadPostSchema";
import Joi from "joi";
import { getSession } from "next-auth/react";

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

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const session = await getSession();
  const userId = session?.user?.name;
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

  await addPost(image, values.caption);
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
