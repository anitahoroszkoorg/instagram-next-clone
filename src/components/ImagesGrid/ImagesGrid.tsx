"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";
import { Post } from "../Post/Post";

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
      <Post
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedImage={selectedImage}
        details={imageDetails}
      />
      <FeedWrapper>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div onClick={() => handlePhotoBoxClick(image)} key={index}>
              <Photobox
                className="photobox"
                src={image.image}
                alt={`Image ${index}`}
                width={500}
                height={500}
              />
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </FeedWrapper>
    </>
  );
};
