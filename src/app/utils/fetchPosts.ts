import { PostDetails } from "@/shared/types/post";

export const fetchPostIds = async ({ pageParam = null }) => {
  const url = pageParam ? `/api/images?cursor=${pageParam}` : `/api/images`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  const postIds = data.posts.map((element: PostDetails) => element.post_id);
  return postIds;
};

export const fetchPostDetails = async (id: string) => {
  const url = `/api/post/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const fetchUsersPosts = async (id: string) => {
  const url = `/api/images/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const fetchAllPublicPosts = async () => {
  const url = `/api/post/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
