import { deleteImagefromDb } from "@/app/db/posts";

export const deletePost = async (id: string) => {
  deleteImagefromDb(id);
};
