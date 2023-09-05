import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

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
  const results = await s3.send(
    new PutObjectCommand({
      Body: stream,
      Bucket: "aws-bucket-next-ig",
      Key: uuidv4(),
    })
  );

  return new Response("ok", { status: 201 });
};
