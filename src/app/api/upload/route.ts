import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//https://stackoverflow.com/questions/65746549/how-do-link-a-file-user-uploaded-via-pre-signed-url-to-database
//todo: invoke lambda function

const insertUrltoDb = async (url: string) => {
  try {
    await prisma.post.create({
      data: {
        image_url: url,
      },
    });
    console.log("URLs inserted successfully.");
  } catch (error) {
    console.error("Error inserting URLs:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (request: Request) => {
  const data = await request.formData();
  const d = data.get("image");
  if (!d || typeof d === "string") {
    return new Response("ok", { status: 400 });
  }
  const stream = await d.arrayBuffer();
  const s3 = new S3Client({
    region: "eu-central-1",
  });
  const fileType = d.type.split("/").pop();
  const key = `${uuidv4()}.${fileType}`;
  const results = await s3.send(
    new PutObjectCommand({
      Body: stream,
      Bucket: "aws-bucket-next-ig",
      Key: key,
      ContentType: "image/jpeg",
    })
  );
  insertUrltoDb(`https://your-bucket-url.amazonaws.com/${key}`);
  return new Response("ok", { status: 201 });
};
