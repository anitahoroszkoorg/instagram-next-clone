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
import useFetch from "@/app/lib/hooks/useFetch";
import { Stories } from "../Stories/Stories";
import { useUser } from "@/app/lib/hooks/userContext";

interface UserDetails {
  username: string;
  full_name: string;
  bio: string;
  user_id: string;
}

interface UserDetailsResponse {
  userDetails: UserDetails;
  message: string;
}

interface ProfileInfoProps {
  slug: string;
  setActiveTab: (tab: "followers" | "following" | "posts") => void;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  slug,
  setActiveTab,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const { data, loading, error } = useFetch<UserDetailsResponse>(
    `/api/userId/${slug}`,
  );

  const { user } = useUser();

  const userDetails = data?.userDetails;

  const isProfileOwner = data?.userDetails.user_id === user?.user_id;

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <Avatar>
          <img src="/avatar.jpeg" alt="User Avatar" width={300} height={300} />
        </Avatar>
      </ProfilePictureContainer>
      <Username>@{userDetails?.username}</Username>
      <StatsContainer>
        <Stats onClick={() => setActiveTab("posts")}>6 Posts</Stats>
        <Stats onClick={() => setActiveTab("followers")}>60 Followers</Stats>
        <Stats onClick={() => setActiveTab("following")}>345 Following</Stats>
      </StatsContainer>
      <ButtonsContainer>
        {!isProfileOwner ? (
          <>
            <FollowButton
              isFollowing={isFollowing}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? "Following" : "Follow"}
            </FollowButton>
            <MessageButton>Message</MessageButton>
          </>
        ) : (
          <>
            <FollowButton isFollowing={true}>Edit</FollowButton>
            <MessageButton>Settings</MessageButton>
          </>
        )}
      </ButtonsContainer>
      <Bio>
        <Name>{userDetails?.full_name}</Name>
        {userDetails?.bio && (
          <ProfileDescription>{userDetails.bio}</ProfileDescription>
        )}
      </Bio>
      <Stories isProfileOwner={isProfileOwner} />
    </ProfileContainer>
  );
};

export default ProfileInfo;
