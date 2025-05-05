export const fetchFollowersData = async (id: string) => {
  const url = `/api/post/`;
  const response = await fetch(`/api/followers/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};
