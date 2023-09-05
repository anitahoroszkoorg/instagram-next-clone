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
  const [contents, setContents] = useState<string>("");

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
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logButtonContents = async () => {
    try {
      const response = await fetch("/api/getAllImages");
      console.log(response);
      const data = await response.json();
      setContents(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
        <button onClick={() => logButtonContents()}>fetch</button>
        {contents && <div>{JSON.stringify(contents)}</div>}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
