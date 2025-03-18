import { UserInfo } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";
interface ProfileDataResponse {
  userDetails: UserInfo;
  message: string;
}
export const useProfileData = (userId: string | undefined | string[]) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await fetchData<ProfileDataResponse>(
        `/api/user/${userId}`,
      );
      return data.userDetails;
    },
    enabled: !!userId,
  });
};
