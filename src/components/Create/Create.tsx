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
  WizardImg,
} from "./styled";
import upload from "../../assets/images/upload-image-icon.png";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";

interface Props {
  openModal?: boolean;
  closeModal?: () => void;
}

export const Create: React.FC<Props> = ({ openModal, closeModal }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setSelectedFile(null);
    setCaption("");
    closeModal && closeModal();
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
    console.log(inputRef);
    console.log(inputRef.current);

    console.log(selectedFile);
    let data = new FormData();

    if (!selectedFile || !caption) {
      return;
    }
    try {
      data.append("image", selectedFile);
      data.append("caption", caption);
      console.log(data);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ModalOverlay style={{ display: openModal ? "flex" : "none" }}>
      <ModalContent>
        <ModalHeader>
          Create a new post
          <CloseButton>
            <CloseIcon onClick={close} />
          </CloseButton>
        </ModalHeader>
        <p>Upload your pictures and movies here:</p>
        {!selectedFile && (
          <>
            <ImgUpload src={upload.src} alt="Upload" />
            <Input
              ref={inputRef}
              type="file"
              onChange={handleFileInputChange}
            />
            <UploadBtn
              isFileSelected={!!selectedFile}
              onClick={handleButtonClick}
            >
              Choose from your device
            </UploadBtn>
          </>
        )}
        {selectedFile && (
          <CreateWizardContainer>
            <WizardImg>
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="selected image"
                width={300}
                height={300}
              />
            </WizardImg>
            <CreateWizardActions>
              <CaptionInput
                onChange={handleCaptionChange}
                placeholder="Add your caption"
              />
              <UploadBtn onClick={onSubmit} isFileSelected>
                Upload!
              </UploadBtn>
            </CreateWizardActions>
          </CreateWizardContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Create;
