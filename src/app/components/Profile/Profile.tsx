"use client";
import React from "react";
import {
  ProfileContainer,
  ProfilePicture,
  InstaStoriesContainer,
  Instastory,
} from "./styled";

const Profile = () => {
  return (
    <>
      <ProfileContainer>
        <ProfilePicture src="" alt="profile" />
        <InstaStoriesContainer>
          <Instastory />
        </InstaStoriesContainer>
      </ProfileContainer>
    </>
  );
};

export default Profile;
