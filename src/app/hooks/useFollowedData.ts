import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/fetchData";
import { User } from "@/shared/types/user";

interface FollowersResponse {
  message: string;
  followed: User[];
}

export const useFollowedData = (userId: string | undefined | string[]) => {
  return useQuery({
    queryKey: ["followed", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await fetchData<FollowersResponse>(
        `/api/followed/${userId}`,
        "GET",
      );
      return data.followed;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
