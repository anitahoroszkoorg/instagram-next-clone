"use client";
import React, { useEffect, useState } from "react";
import { FeedWrapper, Photobox } from "./styled";

export const ImagesGrid = () => {
  const [images, setImages] = useState<string[]>([]);

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

  return (
    <FeedWrapper>
      {images.map((image) => (
        <Photobox src={image} key={image} />
      ))}
    </FeedWrapper>
  );
};
