"use client";
import React, { useState } from "react";
import {
  ProfileContainer,
  ProfilePicture,
  ProfilePictureContainer,
  Button,
  StatsContainer,
  Stats,
  InstaStoriesContainer,
  Instastory,
  StatsNumbers,
} from "./styled";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <ProfileContainer>
      <ProfilePicture src="https://instagram-anitka.s3.eu-central-1.amazonaws.com/sebastian-pena-lambarri-q79ZzOkbQJ8-unsplash.jpg" />
      <Button isFollowing={isFollowing} onClick={() => setIsFollowing(true)}>
        {isFollowing ? "Following" : "Follow"}
      </Button>
      <InstaStoriesContainer>
        <Instastory />
      </InstaStoriesContainer>
    </ProfileContainer>
  );
};

export default Profile;
