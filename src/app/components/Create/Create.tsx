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
  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    const filename = file.name;
    const fileType = file.type;
    const res = await fetch(
      `/api/upload?file=${filename}&fileType=${fileType}`
    );
    const { url } = await res.json();
    const upload = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": fileType },
    });
    if (upload.ok) {
      console.log("Uploaded successfully!");
    } else {
      console.error("Upload failed.");
    }
    const s3FileUrl = `https://<S3_BUCKET_NAME>.s3.us-west-2.amazonaws.com/${filename}`;
    console.log("File URL", s3FileUrl);
  };

  return (
    <ModalOverlay>
      <CloseButton>
        <CloseIcon />
      </CloseButton>
      <ModalContent>
        <ModalHeader>Create a New Post</ModalHeader>
        <ImgUpload src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/upload-image-icon.png" />
        <input
          type="file"
          accept="image/png, image/jpeg"
          // hidden
          onChange={uploadPhoto}
        />
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
