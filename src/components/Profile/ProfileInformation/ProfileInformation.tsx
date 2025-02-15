import React, { useState } from "react";
import {
  ProfileContainer,
  ProfilePictureContainer,
  FollowButton,
  MessageButton,
  StatsContainer,
  Stats,
  Avatar,
  Username,
  ButtonsContainer,
  Bio,
  Name,
  ProfileDescription,
} from "./styled";
import { Stories } from "../Stories/Stories";
import { fetchData } from "@/app/lib/fetchData";
import { UserDetails } from "@/shared/types/user";

interface ProfileInfoProps {
  setActiveTab: (tab: "followers" | "followed" | "posts") => void;
  isProfileOwner: boolean;
  userData: UserDetails;
  loading: boolean;
  error: boolean;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  setActiveTab,
  isProfileOwner,
  userData,
  loading,
  error,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const followUser = async () => {
    try {
      await fetchData("/api/follow", "POST", { user_id: userData.user_id });
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile</p>;
  if (!userData) return <p>User not found</p>;

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <Avatar>
          <img src="/avatar.jpeg" alt="User Avatar" width={300} height={300} />
        </Avatar>
      </ProfilePictureContainer>
      <Username>@{userData.username}</Username>
      <StatsContainer>
        <Stats onClick={() => setActiveTab("posts")}>6 Posts</Stats>
        <Stats onClick={() => setActiveTab("followers")}>60 Followers</Stats>
        <Stats onClick={() => setActiveTab("followed")}>345 Following</Stats>
      </StatsContainer>
      <ButtonsContainer>
        {!isProfileOwner ? (
          <>
            <FollowButton $isfollowing={isFollowing} onClick={followUser}>
              {isFollowing ? "Following" : "Follow"}
            </FollowButton>
            <MessageButton>Message</MessageButton>
          </>
        ) : (
          <>
            <FollowButton $isfollowing={true}>Edit</FollowButton>
            <MessageButton>Settings</MessageButton>
          </>
        )}
      </ButtonsContainer>
      <Bio>
        <Name>{userData?.full_name}</Name>
        {userData?.bio && (
          <ProfileDescription>{userData.bio}</ProfileDescription>
        )}
      </Bio>
      <Stories isProfileOwner={isProfileOwner} />
    </ProfileContainer>
  );
};

export default ProfileInfo;
