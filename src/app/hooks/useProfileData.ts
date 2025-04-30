import { UserInfo } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

interface ProfileResponse {
  message: string;
  userDetails: UserInfo;
}

export const useProfileData = (userId: string) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await fetchData<ProfileResponse>(`/api/user/${userId}`);
      return data.userDetails;
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
};
