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

interface UserDetails {
  username: string;
  full_name: string;
  bio: string;
}

interface UserDetailsResponse {
  userDetails: UserDetails;
  message: string;
}

export const ProfileInfo = ({ slug }: any) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const { data, loading, error } = useFetch<UserDetailsResponse>(
    `/api/userId/${slug}`,
  );

  const userDetails = data?.userDetails;

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <Avatar>
          <img src="/avatar.jpeg" alt="User Avatar" width={300} height={300} />
        </Avatar>
      </ProfilePictureContainer>
      <Username>@{userDetails?.username}</Username>
      <StatsContainer>
        <Stats>6 Posts</Stats>
        <Stats>60 Followers</Stats>
        <Stats>345 Following</Stats>
      </StatsContainer>
      <ButtonsContainer>
        <FollowButton
          isFollowing={isFollowing}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </FollowButton>
        <MessageButton>Message</MessageButton>
      </ButtonsContainer>
      <Bio>
        <Name>{userDetails?.full_name}</Name>
        {userDetails?.bio && (
          <ProfileDescription>{userDetails.bio}</ProfileDescription>
        )}
      </Bio>
      <Stories />
    </ProfileContainer>
  );
};

export default ProfileInfo;
