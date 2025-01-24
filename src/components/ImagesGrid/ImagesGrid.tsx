"use client";
import { ImageDetails } from "@/shared/types/image";
import { ImageComponent } from "../Image/Image";
import { FeedWrapper } from "./styled";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const ImagesGrid: React.FC = () => {
  const [images, setImages] = useState<ImageDetails[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/getAllImagesByFollowedUsers");
        if (!response.ok) {
          toast.error("Unable to get images");
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
      <ToastContainer />
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
