'use client'
import React, { useState } from "react";
import {
  ProfileContainer,
  ProfilePictureBorder,
  ProfilePicture,
  ProfilePictureContainer,
  Button,
  StatsContainer,
  Stats,
  InstaStoriesContainer,
  Instastory,
  StatsNumbers,
} from "./styled";
// import avatar from "../../assets/avatar.jpg";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <ProfileContainer>
      <ProfilePictureContainer>
        <ProfilePictureBorder>
          {/* <ProfilePicture src={avatar} /> */}
        </ProfilePictureBorder>
      </ProfilePictureContainer>
      <StatsContainer>
        <StatsNumbers>40</StatsNumbers>
        <Stats> Posts</Stats>
        <Stats>10K Followers</Stats>
        <Stats>1865 Following</Stats>
      </StatsContainer>
      <Button isFollowing={isFollowing} onClick={() => setIsFollowing(true)}>
        {isFollowing ? "Following" : "Follow"}
      </Button>
      <InstaStoriesContainer>
        <Instastory />
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

export default Profile;