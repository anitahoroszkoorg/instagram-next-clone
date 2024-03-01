import S3Client from "../clients/S3Client";
import { insertUrltoDb } from "@/app/db/posts";

export const addPost = async (file: File, caption: string) => {
  const s3_client = new S3Client();
  const uri = await s3_client.upload_file(file);
  insertUrltoDb(uri, caption.toString());
};
