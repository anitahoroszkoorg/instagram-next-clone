import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertUrltoDb = async (url: string, caption: string) => {
  try {
    console.log(url);
    await prisma.post.create({
      data: {
        image_url: url,
        caption: caption,
      },
    });
    console.log("URL and caption inserted successfully.");
  } catch (error) {
    console.error("Error inserting URL and caption:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (request: Request) => {
  const data = await request.formData();
  const blob = data.get("image");
  const caption = data.get("caption");

  if (!blob || typeof blob === "string" || !caption) {
    return new Response("Bad Request", { status: 400 });
  }

  const reader = blob.stream().getReader();
  const chunks = [];
  let result;
  while (!(result = await reader.read()).done) {
    chunks.push(result.value);
  }
  const buffer = Buffer.concat(chunks);
  const stream = await blob.arrayBuffer();

  const s3 = new S3Client({
    region: "eu-central-1",
  });
  const fileType = blob.type.split("/").pop();
  const key = `${uuidv4()}.${fileType}`;
  await s3.send(
    new PutObjectCommand({
      Body: buffer,
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: "image/jpeg",
    }),
  );
  const uri = `s3://${process.env.AWS_BUCKET_NAME}/${key}`;

  insertUrltoDb(uri, caption.toString());

  return new Response("Created", { status: 201 });
};
