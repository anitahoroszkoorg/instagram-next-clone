import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const POST = async (request: Request) => {
  const data = await request.formData();
  const data2 = data.get("image");

  const s3 = new S3Client({
    region: "eu-central-1",
  });
  const results = await s3.send(
    new PutObjectCommand({
      Body: data2,
      Bucket: "aws-bucket-next-ig",
      Key: "dawdwadwa2.jpg",
    })
  );
  // console.log(results);

  return new Response("ok", { status: 200 });
};
