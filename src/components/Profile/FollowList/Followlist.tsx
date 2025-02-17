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
  EmptyRow,
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
  setActiveTab: (tab: "followers" | "followed" | "posts") => void;
  activeTab: string;
  id: string;
  isProfileOwner: boolean;
}

const FollowList: React.FC<FollowListProps> = ({
  setActiveTab,
  activeTab,
  id,
  isProfileOwner,
}) => {
  const { data, loading, error } = useFetch<{
    followers: User[];
    following: User[];
  }>(`/api/followers/${id}`);

  const users =
    activeTab === "followers" ? data?.followers || [] : data?.following || [];

  const handleDeleteFollower = async (userId: string) => {
    try {
      const response = await fetchData(`/api/followers/${userId}`, "DELETE");
      if (response.status !== 200) {
        toast.error("Unable to remove follower.");
      } else {
        toast.success("Follower removed successfully.");
      }
    } catch (error) {
      console.error("Error removing follower:", error);
      toast.error("Something went wrong.");
    }
  };
  if (activeTab === "posts") return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

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
          $active={activeTab === "followed"}
          onClick={() => setActiveTab("followed")}
        >
          Following
        </Tab>
      </Tabs>
      <List>
        {users.length > 0 ? (
          users.map((user) => (
            <UserRow key={user.user_id}>
              <ProfileImage
                src={user.profilePicture || "/avatar.jpeg"}
                alt={user.username}
              />
              <Username>
                <Link href={`/profile/${user.user_id}/`}>@{user.username}</Link>
              </Username>
              <FollowButton $following={activeTab === "followed"}>
                {activeTab === "followed" ? "Unfollow" : "Follow"}
              </FollowButton>

              {activeTab === "followers" && isProfileOwner && (
                <Button onClick={() => handleDeleteFollower(user.user_id)}>
                  <DeleteOutlineIcon
                    style={{ color: "grey", padding: "0.2em" }}
                  />
                </Button>
              )}
            </UserRow>
          ))
        ) : (
          <EmptyRow>
            {activeTab === "followers" ? "No followers." : "No followed users."}
          </EmptyRow>
        )}
      </List>
    </Container>
  );
};

export default FollowList;
