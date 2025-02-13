import React from "react";
import {
  UserRow,
  ProfileImage,
  Username,
  FollowButton,
  Container,
  Tab,
  Tabs,
  List,
  Button,
} from "./styled";
import useFetch from "@/app/lib/hooks/useFetch";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
import { fetchData } from "@/app/lib/fetchData";
import { toast } from "react-toastify";

interface User {
  user_id: string;
  username: string;
  profilePicture?: string;
}

interface FollowListProps {
  setActiveTab: (tab: "followers" | "following" | "posts") => void;
  activeTab: string;
  id: string;
}

const FollowList: React.FC<FollowListProps> = ({
  setActiveTab,
  activeTab,
  id,
}) => {
  const { data } = useFetch<{ followers: User[]; following: User[] }>(
    `/api/followers/${id}`,
  );

  const users =
    activeTab === "followers" ? data?.followers || [] : data?.following || [];

  const handleDeletefollower = async () => {
    try {
      const response = await fetchData(`/api/followers/${id}`, "DELETE", {
        user_id: id,
      });
      if (response.status !== 200) {
        toast.error("Unable to remove follower.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (activeTab === "posts") return null;

  return (
    <Container>
      <Tabs>
        <Tab
          $active={activeTab === "followers"}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </Tab>
        <Tab
          $active={activeTab === "following"}
          onClick={() => setActiveTab("following")}
        >
          Following
        </Tab>
      </Tabs>
      <List>
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <UserRow key={user.user_id}>
              <ProfileImage
                src={user.profilePicture || "/avatar.jpeg"}
                alt={user.username}
              />
              <Username>
                <Link href={`/profile/${user.user_id}/`}>@{user.username}</Link>
              </Username>
              <FollowButton $following={activeTab === "following"}>
                {activeTab === "following" ? "Unfollow" : "Follow"}
              </FollowButton>
              <Button onClick={handleDeletefollower}>
                <DeleteOutlineIcon
                  style={{ color: "grey", padding: "0.2em" }}
                />
              </Button>
            </UserRow>
          ))}
      </List>
    </Container>
  );
};

export default FollowList;
