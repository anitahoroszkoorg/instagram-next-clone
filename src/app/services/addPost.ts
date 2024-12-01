import { insertImageToDb } from "@/app/db/posts";

export const addPost = async (file: any, caption: string, id: any) => {
  insertImageToDb(file, caption, id);
};
