import React from "react";
import {
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalHeader,
  ImgUpload,
  Input,
} from "./styled";
import CloseIcon from "@mui/icons-material/Close";

const Create = () => {
  return (
    <ModalOverlay>
      <CloseButton>
        <CloseIcon />
      </CloseButton>
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>
        <ImgUpload src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/upload-image-icon.png" />
        <Input type="file" />
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
