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
  BackDropContainer,
  CommentsSection,
  FeedWrapper,
  LikeSection,
  Photo,
  PhotoDescription,
  PhotoDetails,
  Photobox,
  PhotoboxFrame,
  TagsContainer,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [show, setShow] = useState(false);
  const likesCount = 5;

  return (
    <>
      <ProfileContainer>
        <ProfilePicture src="https://instagram-anitka.s3.eu-central-1.amazonaws.com/sebastian-pena-lambarri-q79ZzOkbQJ8-unsplash.jpg" />
        <Button isFollowing={isFollowing} onClick={() => setIsFollowing(true)}>
          {isFollowing ? "Following" : "Follow"}
        </Button>
        <InstaStoriesContainer>
          <Instastory />
        </InstaStoriesContainer>
      </ProfileContainer>
      <BackDropContainer show={show} onClick={() => setShow(false)}>
        <PhotoboxFrame>
          <Photo src="https://images.pexels.com/photos/5660045/pexels-photo-5660045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <PhotoDetails>
            <PhotoDescription>
              {/* <Avatar src={avatar} /> */}
              @janice345
            </PhotoDescription>
            <PhotoDescription>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
              exercitationem vero? Quam vero quia facilis necessitatibus
              expedita!
            </PhotoDescription>
            <TagsContainer>tag</TagsContainer>
            <LikeSection>
              <FavoriteBorderIcon />
              {likesCount}
              <SmsOutlinedIcon />
              {likesCount}
              <BookmarkBorderOutlinedIcon />
              {likesCount}
            </LikeSection>
            <CommentsSection>comment</CommentsSection>
          </PhotoDetails>
        </PhotoboxFrame>
      </BackDropContainer>
      <FeedWrapper>
        <Photobox
          src="https://images.pexels.com/photos/6373255/pexels-photo-6373255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          onClick={() => setShow(true)}
        />
        <Photobox src="https://images.pexels.com/photos/5660045/pexels-photo-5660045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Photobox src="https://images.pexels.com/photos/6240913/pexels-photo-6240913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Photobox src="https://images.pexels.com/photos/9828102/pexels-photo-9828102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Photobox src="https://images.pexels.com/photos/13371111/pexels-photo-13371111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Photobox src="https://images.pexels.com/photos/6127875/pexels-photo-6127875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Photobox src="https://images.pexels.com/photos/6127875/pexels-photo-6127875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Photobox src="https://images.pexels.com/photos/6127875/pexels-photo-6127875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Photobox src="https://images.pexels.com/photos/6127875/pexels-photo-6127875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
      </FeedWrapper>
    </>
  );
};

export default Profile;
