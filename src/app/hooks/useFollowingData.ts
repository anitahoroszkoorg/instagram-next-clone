import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/fetchData";
import { UserInfo } from "@/shared/types/user";
interface FollowersDataResponse {
  following: UserInfo[];
  message: string;
}
export const useFollowingData = (userId: string | undefined | string[]) => {
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      if (!userId) return { status: 200, data: [] };
      return await fetchData<any>(`/api/follwed/${userId}`, "GET");
    },

    enabled: !!userId,
  });
};
