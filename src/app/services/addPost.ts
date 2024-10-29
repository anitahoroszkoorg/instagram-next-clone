import { getAllPosts, insertImageToDb } from "@/app/db/posts";

export const addPost = async (file: any, caption: string, id: any) => {
  insertImageToDb(file, caption, id);
};

export const getPosts = async (userId: number) => {
  const posts = await getAllPosts(userId);
  return posts;
};
