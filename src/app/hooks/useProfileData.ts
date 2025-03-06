import { UserInfo } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

export const useProfileData = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await fetchData<UserInfo>(`/api/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
};
