import { UserInfo } from "@/shared/types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/fetchData";
import { useSession } from "next-auth/react";

interface ProfileDataResponse {
  userDetails: UserInfo;
  message: string;
}

export const useLoggedInUser = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["loggedIn", session?.user?.email],
    queryFn: async () => {
      const { data } = await fetchData<ProfileDataResponse>(`/api/user/`);
      return data.userDetails;
    },
    enabled: !!session,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
