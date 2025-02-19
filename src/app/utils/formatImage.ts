import { PostDetails } from "@/shared/types/post";

export const formatImage = (post: PostDetails) => {
  return {
    ...post,
    image:
      post.image && Buffer.from(post.image).toString("base64")
        ? `data:image/jpeg;base64,${Buffer.from(post.image).toString("base64")}`
        : null,
  };
};
