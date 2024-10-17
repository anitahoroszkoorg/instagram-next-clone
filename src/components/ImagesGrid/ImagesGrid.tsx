"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";
import { Post } from "../Post/Post";

export const ImagesGrid = () => {
  const [images, setImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/getAllImages");
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
        {images.map((image, index) => (
          <div onClick={() => handlePhotoBoxClick(image)} key={index}>
            <Photobox className="photobox" src={image} key={index} />
          </div>
        ))}
      </FeedWrapper>
    </>
  );
};
