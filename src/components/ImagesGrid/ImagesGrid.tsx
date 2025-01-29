"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";

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

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/getAllImagesByFollowedUsers");
        //change route to get images for a user
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

  return (
    <>
      <FeedWrapper>
        {images.length > 0 ? (
          images.map((image) => <Photobox src={image.image} alt="photo" />)
        ) : (
          <></>
        )}
      </FeedWrapper>
    </>
  );
};
