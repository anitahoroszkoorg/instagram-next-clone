import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  _Object,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const GET = async () => {
  const bucketName = "aws-bucket-next-ig";
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });
    let isTruncated = true;
    let contents: _Object[] = [];
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      contents.push(...(Contents ?? []));
      isTruncated = IsTruncated || false;
      command.input.ContinuationToken = NextContinuationToken;
    }
    const signedUrls = await Promise.all(
      contents.map(async (object: any) => {
        const objectKey = object.Key;
        const objectUrl = await getSignedUrl(
          client,
          new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
          }),
          { expiresIn: 3600 },
        );
        return objectUrl;
      }),
    );
    return new Response(JSON.stringify(signedUrls), { status: 200 });
  } catch (err: any) {
    if (err instanceof Error) {
      console.error(err.message);
      throw new Error("Internal Server Error");
    } else {
      console.error("An unknown error occurred:", err);
      throw new Error("Internal Server Error");
    }
  }
};
