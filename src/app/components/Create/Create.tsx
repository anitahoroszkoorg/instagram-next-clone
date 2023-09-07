import React, { useState, useEffect } from "react";
import { ModalOverlay, ModalContent, CloseButton, ModalHeader } from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

const Create = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]);
    setIsFilePicked(true);
  };

  const uploadFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      return;
    }
    try {
      let data = new FormData();
      data.append("image", selectedFile);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        fetchImages();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  console.log(typeof images);

  return (
    <ModalOverlay>
      <CloseButton>
        <CloseIcon />
      </CloseButton>
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => fetchImages()}>imgs</button>
        <button onClick={(e) => uploadFile(e)}>upload</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
