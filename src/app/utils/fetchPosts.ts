export const fetchPosts = async ({ pageParam = null }) => {
  const url = pageParam ? `/api/images?cursor=${pageParam}` : `/api/images`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
