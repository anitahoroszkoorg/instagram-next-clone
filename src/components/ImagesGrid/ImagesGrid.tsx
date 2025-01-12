"use client";

import React, { useEffect, useState } from "react";
import { FeedWrapper } from "./styled";
import { Image } from "../Image/Image";
import { ImageDetails } from "@/shared/types/image";

export const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<ImageDetails[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageDetails | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/getAllImagesByFollowedUsers");
        if (!response.ok) {
          console.error(`Failed to fetch images. Status: ${response.status}`);
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
    };

    fetchImages();
  }, []);

  const handlePhotoBoxClick = (image: ImageDetails) => {
    setSelectedImage(image);
  };

  return (
    <FeedWrapper>
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.postId} onClick={() => handlePhotoBoxClick(image)}>
            <Image imageDetails={selectedImage} />
          </div>
        ))
      ) : (
        <p>No images found</p>
      )}
    </FeedWrapper>
  );
};
