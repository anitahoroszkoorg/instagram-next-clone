import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  _Object,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({});

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
          { expiresIn: 3600 }
        );
        return objectUrl;
      })
    );
    console.log(signedUrls);
    return new Response(JSON.stringify(signedUrls), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
};
