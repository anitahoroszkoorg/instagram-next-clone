import { PostDetails } from "@/shared/types/post";

export const formatImage = (post: PostDetails) => {
  const imageData =
    typeof post.image === "string" || Array.isArray(post.image)
      ? post.image
      : null;

  return {
    ...post,
    image:
      imageData && Buffer.from(imageData, "base64").toString("base64")
        ? `data:image/jpeg;base64,${Buffer.from(imageData, "base64").toString(
            "base64",
          )}`
        : null,
  };
};
