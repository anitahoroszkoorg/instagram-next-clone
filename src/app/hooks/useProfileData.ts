import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/utils/fetchData";
import { UserDetails } from "@/shared/types/user";

export const useProfileData = (userId: string | undefined | string[]) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      return await fetchData<UserDetails>(`/api/user/${userId}`, "GET");
    },
    enabled: !!userId,
  });
};
