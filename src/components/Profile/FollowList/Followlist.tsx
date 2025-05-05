import React, { useState } from "react";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Link from "next/link";
import { fetchData } from "@/app/utils/fetchData";
import { toast } from "react-toastify";
import { useFollowData } from "@/app/hooks/useFollowData";

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
  const { data: followData, isLoading, isError } = useFollowData(id);
  const followers = followData?.followers || [];
  const followed = followData?.followed || [];
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const users = activeTab === "followers" ? followers : followed;

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
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data.</p>;

  const followUser = async (userId: string) => {
    try {
      await fetchData("/api/follow", "POST", { user_id: userId });
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
      setIsFollowing(false);
      toast.error("Something went wrong.");
    }
  };

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
                src={user.profile_picture || "/avatar.jpeg"}
                alt={user.username}
              />
              <Username>
                <Link href={`/profile/${user.user_id}/`}>@{user.username}</Link>
              </Username>
              <FollowButton
                onClick={() => followUser(user.user_id)}
                $following={activeTab === "followed"}
              >
                {activeTab === "followed"
                  ? "Unfollow"
                  : isFollowing
                    ? "Following"
                    : "Follow"}
              </FollowButton>
              {activeTab === "followers" && isProfileOwner && (
                <Button onClick={() => handleDeleteFollower(user.user_id)}>
                  <DeleteOutlineIcon
                    style={{
                      color: "grey",
                      margin: "0.3em 0.5em 0.3em 0.8em",
                    }}
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
