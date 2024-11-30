"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";
import { Post } from "../Post/Post";

export const ImagesGrid = () => {
  const [images, setImages] = useState<{ image: string }[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/getAllImages");
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

  const handlePhotoBoxClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setModalVisible(true);
  };

  return (
    <>
      <Post
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedImage={selectedImage}
      />
      <FeedWrapper>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div onClick={() => handlePhotoBoxClick(image.image)} key={index}>
              <Photobox
                className="photobox"
                src={image.image}
                alt={`Image ${index}`}
                // width={500}
                // height={500}
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
