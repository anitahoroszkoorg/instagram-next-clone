"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";
import { Post } from "../Post/Post";

export const ImagesGrid = () => {
  const [images, setImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/getAllImages");
        if (!response.ok) {
          console.error("Failed to fetch image data:", response.statusText);
          return;
        }
        const blob = await response.blob();
        const base64Image = await blobToBase64(blob);
        const json = atob(base64Image.substring(29));
        const result = JSON.parse(json);
        setImages(result);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

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
        {images.length > 0 &&
          images.map((image, index) => (
            <div onClick={() => handlePhotoBoxClick(image)} key={index}>
              <Photobox
                className="photobox"
                src={image}
                alt={`Image ${index}`}
                width={500}
                height={500}
              />
            </div>
          ))}
      </FeedWrapper>
    </>
  );
};
