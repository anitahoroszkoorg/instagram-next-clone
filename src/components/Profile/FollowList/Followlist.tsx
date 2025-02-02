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
} from "./styled";

interface User {
  user_id: string;
  username: string;
  profilePicture: string;
}

const dummyFollowers: User[] = [
  {
    user_id: "1",
    username: "john_doe",
    profilePicture: "",
  },
  {
    user_id: "2",
    username: "jane_doe",
    profilePicture: "",
  },
  {
    user_id: "3",
    username: "alice_smith",
    profilePicture: "",
  },
];

const dummyFollowing: User[] = [
  {
    user_id: "4",
    username: "bob_jones",
    profilePicture: "",
  },
  {
    user_id: "5",
    username: "charlie_brown",
    profilePicture: "",
  },
];

interface FollowListProps {
  setActiveTab: (tab: "followers" | "following" | "posts") => void;
  activeTab: string;
}

const FollowList: React.FC<FollowListProps> = ({ setActiveTab, activeTab }) => {
  const users = activeTab === "followers" ? dummyFollowers : dummyFollowing;

  const onToggleFollow = (userId: string) => {
    console.log(`Toggled follow status for user ${userId}`);
  };

  if (activeTab === "posts") return null;

  return (
    <Container>
      <Tabs>
        <Tab
          active={activeTab === "followers"}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </Tab>
        <Tab
          active={activeTab === "following"}
          onClick={() => setActiveTab("following")}
        >
          Following
        </Tab>
      </Tabs>
      <List>
        {users.map((user) => (
          <UserRow key={user.user_id}>
            <ProfileImage src={user.profilePicture} alt={user.username} />
            <Username>@{user.username}</Username>
            <FollowButton
              following={activeTab === "following"}
              onClick={() => onToggleFollow(user.user_id)}
            >
              {activeTab === "following" ? "Unfollow" : "Follow"}
            </FollowButton>
          </UserRow>
        ))}
      </List>
    </Container>
  );
};

export default FollowList;
