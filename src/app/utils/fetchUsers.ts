import { User } from "@/globals";
import { fetchData } from "@/app/utils/fetchData";

interface UserResponse {
  users: User[];
}
export async function fetchUsers(query: string) {
  const res = await fetchData<UserResponse>(`/api/users?search=${query}`);
  return res.data;
}
