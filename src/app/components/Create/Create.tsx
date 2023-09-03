import React, { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalHeader,
  ImgUpload,
} from "./styled";
import CloseIcon from "@mui/icons-material/Close";

const Create = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files![0]);
    setIsFilePicked(true);
  };

  const uploadFile = async (e: { preventDefault: () => void } | undefined) => {
    e?.preventDefault();
    if (!selectedFile) {
      return "XD";
    }
    try {
      let data = new FormData();

      data.append("image", selectedFile);
      // data.append("name", selectedFile.name);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
    //
    // const response = await fetch("/api/getSignedUrl", {"name": selectedFile.name});
    // presignedUrl = response.presignedUrl
    //   const options = {
    //   method: 'PUT',
    //   body: selectedFile
    // };
    // return fetch(presignedUrl, options
  };

  return (
    <ModalOverlay>
      <CloseButton>
        <CloseIcon />
      </CloseButton>
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>
        <ImgUpload src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/upload-image-icon.png" />
        <input type="file" onChange={handleFileInput} />
        <button onClick={(e) => uploadFile(e)}>upload!</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
