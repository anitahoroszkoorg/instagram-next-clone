import React, { useState, useRef, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalInside,
  UploadBtn,
  SelectedImage,
  CaptionInput,
} from "./styled";

interface Props {
  openModal: boolean;
  closeModal: () => void;
}

export const Create: React.FC<Props> = ({ openModal, closeModal }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");

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

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const uploadFile = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedFile || !caption) {
      return;
    }
    try {
      let data = new FormData();
      data.append("image", selectedFile);
      data.append("caption", caption);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputStyle = { display: "none" };

  return (
    <ModalOverlay style={{ display: openModal ? "flex" : "none" }}>
      <ModalContent>
        <ModalHeader>
          Create a New Post
          <div className="close-button" onClick={closeModal}>
            x
          </div>
        </ModalHeader>
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
            <SelectedImage>
              <img src={URL.createObjectURL(selectedFile)} />
            </SelectedImage>
            <CaptionInput
              type="text"
              placeholder="Enter a caption"
              value={caption}
              onChange={handleCaptionChange}
            />
            <UploadBtn onClick={(e) => uploadFile(e)}>Upload!</UploadBtn>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
