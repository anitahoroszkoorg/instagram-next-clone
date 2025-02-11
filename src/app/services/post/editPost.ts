import { updatePostInDb } from "@/app/db/posts";
import { PostDetails } from "@/shared/types/post";

export const editPost = async (
  id: string,
  data: Partial<
    Omit<
      PostDetails,
      | "created_at"
      | "image"
      | "post_id"
      | "user_id"
      | "likes"
      | "comments"
      | "user"
    >
  >,
) => {
  updatePostInDb(id, data);
};
