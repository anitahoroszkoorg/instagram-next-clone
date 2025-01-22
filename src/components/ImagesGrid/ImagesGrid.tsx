"use client";

import React, { useEffect, useState } from "react";
import { FeedWrapper } from "./styled";
import { ImageComponent } from "../Image/Image";
import { ImageDetails } from "@/shared/types/image";

export const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<ImageDetails[]>([]);

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
          const mappedImages: ImageDetails[] = data.posts.map(
            (post: ImageDetails) => ({
              imageUrl: post.image,
              caption: post.caption,
              createdAt: post.createdAt,
            }),
          );
          setImages(mappedImages);
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <FeedWrapper>
      {images.length > 0 ? (
        images.map((image) => (
          <div key={image.postId}>
            <ImageComponent imageDetails={image} />
          </div>
        ))
      ) : (
        <p>No images found</p>
      )}
    </FeedWrapper>
  );
};
