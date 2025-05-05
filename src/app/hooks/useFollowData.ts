import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/fetchData";
import { User } from "@/shared/types/user";

interface FollowDataResponse {
  message: string;
  followers: User[];
  followed: User[];
}

export const useFollowData = (userId: string | undefined | string[]) => {
  return useQuery({
    queryKey: ["follow-data", userId],
    queryFn: async () => {
      if (!userId) return { followers: [], followed: [] };
      const { data } = await fetchData<FollowDataResponse>(
        `/api/followers/${userId}`,
        "GET",
      );
      return {
        followers: data.followers,
        followed: data.followed,
      };
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
