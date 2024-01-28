import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
import { Readable } from "stream";

const prisma = new PrismaClient();

const insertUrltoDb = async (url: string, caption: string) => {
  try {
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
  const d = data.get("image");
  const caption = data.get("caption");

  if (!d || typeof d === "string" || !caption) {
    return new Response("Bad Request", { status: 400 });
  }

  const stream = await d.arrayBuffer();
  const readableStream = new Readable();
  readableStream.push(Buffer.from(stream));
  readableStream.push(null);
  const s3 = new S3Client({
    region: "eu-central-1",
  });
  const fileType = d.type.split("/").pop();
  const key = `${uuidv4()}.${fileType}`;
  const results = await s3.send(
    new PutObjectCommand({
      Body: readableStream,
      Bucket: "aws-bucket-next-ig",
      Key: key,
      ContentType: "image/jpeg",
    }),
  );

  const fileContents = Buffer.from(stream).toString("base64");

  const dataUrl = `data:${d.type};base64,${fileContents}`;

  insertUrltoDb(dataUrl, caption.toString());

  return new Response("Created", { status: 201 });
};
