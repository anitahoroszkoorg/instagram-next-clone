import { getAllPublicPostsFromDb } from "@/app/db/posts";

export const getAllPublicPosts = async () => {
  const posts = getAllPublicPostsFromDb();
  return posts;
};
