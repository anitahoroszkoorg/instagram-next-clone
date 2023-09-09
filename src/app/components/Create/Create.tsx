import React, { useState, useRef } from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalHeader,
  ModalInside,
  UploadBtn,
  SelectedImage,
} from "./styled";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

export const Create = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setIsFilePicked(true);
    } else {
      setSelectedFile(null);
      setIsFilePicked(false);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
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
        closeModal();
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

  const closeModal = () => {

  };

  const inputStyle = { display: "none" };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>{" "}
        {!selectedFile && (
          <>
            <ModalInside>Upload your pictures and movies here</ModalInside>
            <input
              ref={inputRef}
              style={inputStyle}
              type="file"
              onChange={handleFileInputChange}
            />
            <UploadBtn onClick={handleButtonClick}>
              Choose from your computer
            </UploadBtn>
          </>
        )}
        {selectedFile && (
          <>
            <SelectedImage
              src={URL.createObjectURL(selectedFile)}
              alt="Selected"
            />
            <UploadBtn onClick={(e) => uploadFile(e)}>Upload!</UploadBtn>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
