import { S3Client as S3 } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
class S3Client {
  s3: S3;
  bucket: string | undefined;
  constructor() {
    this.s3 = new S3({
      region: "eu-central-1",
    });
    this.bucket = process.env.AWS_BUCKET_NAME;
  }

  async upload_file(blob: File) {
    const buffer = Buffer.from(await blob.arrayBuffer());
    const fileType = blob.type.split("/").pop();
    const key = `${uuidv4()}.${fileType}`;
    await this.s3.send(
      new PutObjectCommand({
        Body: buffer,
        Bucket: this.bucket,
        Key: key,
        ContentType: "image/jpeg",
      }),
    );
    return `s3://${this.bucket}/${key}`;
  }
}
export default S3Client;
