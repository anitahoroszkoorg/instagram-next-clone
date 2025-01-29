import React, { useState } from "react";
import {
  ProfileContainer,
  ProfilePictureContainer,
  FollowButton,
  MessageButton,
  StatsContainer,
  Stats,
  InstaStoriesContainer,
  Instastory,
  Avatar,
  Username,
  ButtonsContainer,
} from "./styled";

export const ProfileInfo = ({ slug }: any) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <Avatar>
          <img src="/avatar.jpeg" alt="User Avatar" width={300} height={300} />
        </Avatar>
      </ProfilePictureContainer>
      <Username>{slug}</Username>
      <StatsContainer>
        <Stats>6 Posts</Stats>
        <Stats>60 Followers</Stats>
        <Stats>345 Following</Stats>
      </StatsContainer>
      <ButtonsContainer>
        {" "}
        <FollowButton
          isFollowing={isFollowing}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? "Following" : "Follow"}
        </FollowButton>
        <MessageButton>Message</MessageButton>
      </ButtonsContainer>
      <InstaStoriesContainer>
        <Instastory></Instastory>
        <Instastory />
        <Instastory />
        <Instastory />
        <Instastory />
        <Instastory />
        <Instastory />
      </InstaStoriesContainer>
    </ProfileContainer>
  );
};

export default ProfileInfo;
