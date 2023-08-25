"use client";
import React, { useState } from "react";
import {
  BackDropContainer,
  FeedWrapper,
  Photobox,
  PhotoboxFrame,
  Photo,
  PhotoDetails,
  Avatar,
  PhotoDescription,
  TagsContainer,
  CommentsSection,
  LikeSection,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
const Feed = () => {
  const [show, setShow] = useState(false);
  const likesCount = 5;
  return (
    <>
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

export default Feed;
