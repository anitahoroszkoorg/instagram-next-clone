import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const GET = async () => {
  const command = new ListObjectsV2Command({
    Bucket: "aws-bucket-next-ig",
  });
  try {
    let isTruncated = true;
    console.log("Your bucket contains the following objects:\n");
    let contents = "";
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      const contentsList = Contents?.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated || false;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
    return new Response(contents, { status: 200 });
  } catch (err) {
    console.error(err);
  }
};
