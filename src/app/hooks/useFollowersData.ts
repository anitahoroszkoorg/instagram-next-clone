import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/fetchData";
import { User } from "@/globals";

export const useFollowersData = (userId: string | undefined | string[]) => {
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      if (!userId) return { status: 200, data: [] };
      return await fetchData<User[]>(`/api/followers/${userId}`, "GET");
    },

    enabled: !!userId,
  });
};
