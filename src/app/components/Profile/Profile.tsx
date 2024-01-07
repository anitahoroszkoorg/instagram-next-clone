"use client";
import React, { useEffect, useState } from "react";
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
  const [show, setShow] = useState<boolean>(false);
  const likesCount = 5;
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/getAllMyImages");
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <ProfileContainer>
        <ProfilePicture src="https://instagram-anitka.s3.eu-central-1.amazonaws.com/sebastian-pena-lambarri-q79ZzOkbQJ8-unsplash.jpg" />
        <Button>Follow</Button>
        <InstaStoriesContainer>
          <Instastory />
        </InstaStoriesContainer>
      </ProfileContainer>
      <BackDropContainer
        show={show ? true : false}
        onClick={() => setShow(false)}
      >
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
        {images.map((image) => (
          <Photobox src={image} key={image} />
        ))}
      </FeedWrapper>
    </>
  );
};

export default Profile;
