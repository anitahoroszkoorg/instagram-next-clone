import { fetchData } from "@/app/utils/fetchData";
import { User, UserInfo } from "@/shared/types/user";

interface UserResponse {
  users: User[];
}
export async function fetchUsers(query: string) {
  const res = await fetchData<UserResponse>(`/api/users?search=${query}`);
  return res.data;
}

export async function fetchUserDetails(userId: string) {
  const res = await fetchData<UserInfo>(`/api/user/${userId}`);
  return res.data;
}
