import { UserInfo } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";

interface ProfileDataResponse {
  userDetails: UserInfo;
  message: string;
}

export const useLoggedInUser = () => {
  return useQuery({
    queryKey: ["loggedIn"],
    queryFn: async () => {
      const { data } = await fetchData<ProfileDataResponse>(`/api/user/`);
      return data.userDetails;
    },
    staleTime: 1000 * 60 * 5,
  });
};
