import React, { useState, useRef } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  UploadBtn,
  CaptionInput,
  ImgUpload,
  CloseButton,
  Input,
  CreateWizardContainer,
  CreateWizardActions,
} from "./styled";
import upload from "../../assets/images/upload-image-icon.png";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";

interface Props {
  openModal: boolean;
  closeModal: () => void;
}

interface IFormInput {
  caption: string;
}

export const Create: React.FC<Props> = ({ openModal, closeModal }) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>();

  const clear = () => {
    setSelectedFile(null);
    setCaption("");
  };

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

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const onSubmit = async () => {
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
        clear();
        closeModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalOverlay style={{ display: openModal ? "flex" : "none" }}>
        <ModalContent>
          <ModalHeader>
            Create a new post
            <CloseButton>
              <CloseIcon onClick={closeModal} />
            </CloseButton>
          </ModalHeader>
          <p>Upload your pictures and movies here:</p>
          {!selectedFile && (
            <>
              <ImgUpload src={upload.src} alt="Upload" />
              <Input
                ref={(e) => {
                  inputRef.current = e as HTMLInputElement;
                }}
                type="file"
                onChange={handleFileInputChange}
              />
              <UploadBtn onClick={handleButtonClick}>
                Choose from your device
              </UploadBtn>
            </>
          )}
          {selectedFile && (
            <CreateWizardContainer>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="selected image"
              />
              <CreateWizardActions>
                <CaptionInput value={caption} onChange={handleCaptionChange} />
                <UploadBtn type="submit">Upload!</UploadBtn>
              </CreateWizardActions>
            </CreateWizardContainer>
          )}
        </ModalContent>
      </ModalOverlay>
    </form>
  );
};

export default Create;
