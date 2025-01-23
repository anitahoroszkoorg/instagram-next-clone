"use client";
import { ImageDetails } from "@/shared/types/image";
import { ImageComponent } from "../Image/Image";
import { FeedWrapper } from "./styled";
import { useEffect, useState } from "react";

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
          setImages(data.posts);
        }
      } catch (error: any) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <FeedWrapper>
      {images.length > 0 ? (
        images.map((image: ImageDetails | null) => (
          <div key={image?.post_id}>
            <ImageComponent imageDetails={image} />
          </div>
        ))
      ) : (
        <p>No images found</p>
      )}
    </FeedWrapper>
  );
};
