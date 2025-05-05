import Link from "next/link";
import { Avatar, UserDetails } from "../Image/styled";
import { Username } from "../ImageModal/styled";

export const UserLink = ({
  user,
}: {
  user: { username: string; profile_image?: string; user_id: string };
}) => (
  <Link href={`/profile/${user.user_id}`}>
    <UserDetails>
      <Avatar
        src={user.profile_image || "/avatar.jpeg"}
        alt={`${user.username}'s profile`}
      />
      <Username>{user.username}</Username>
    </UserDetails>
  </Link>
);
