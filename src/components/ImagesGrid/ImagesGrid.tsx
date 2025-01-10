"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper } from "./styled";
import { Avatar } from "@mui/material";
import {
  PhotoboxFrame,
  Photo,
  PhotoDetails,
  PhotoDescription,
  Username,
  TagsContainer,
  LikeSection,
  CommentsSection,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";

interface ImageDetails {
  caption?: string;
  tags?: string[];
  userId: number;
  createdAt: string;
  postId: number;
  image: string;
}

export const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<ImageDetails[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/getAllImagesByFollowedUsers");
        if (!response.ok) {
          console.error("Failed to fetch images. Status:", response.status);
          return;
        }
        const data = await response.json();
        if (data.posts && Array.isArray(data.posts)) {
          setImages(data.posts);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  const handlePhotoBoxClick = (image: ImageDetails) => {
    setSelectedImage(image.image);
    setImageDetails(image);
    setModalVisible(true);
  };

  return (
    <>
      <FeedWrapper>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div onClick={() => handlePhotoBoxClick(image)} key={index}>
              <PhotoboxFrame>
                <Photo src={image.image} alt="photo" />
                <PhotoDetails>
                  <PhotoDescription>
                    <Avatar src="" />
                    <Username>user45532</Username>
                  </PhotoDescription>
                  <PhotoDescription>
                    {imageDetails?.caption ? imageDetails?.caption : null}
                  </PhotoDescription>
                  <TagsContainer>#lkn#ljndfljn#ibsfkjb#kjbsdjbc</TagsContainer>
                  <LikeSection>
                    <FavoriteBorderIcon />
                    <SmsOutlinedIcon />
                  </LikeSection>
                  <CommentsSection>comment</CommentsSection>
                </PhotoDetails>
              </PhotoboxFrame>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </FeedWrapper>
    </>
  );
};
