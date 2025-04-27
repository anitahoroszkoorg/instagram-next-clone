"use client";
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
  Error,
  ImageWrapper,
} from "./styled";
import upload from "../../assets/images/upload-image-icon.png";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { validateImage } from "@/app/utils/validateImage";
import { toast } from "react-toastify";
import { fetchData } from "@/app/utils/fetchData";

interface Props {
  openModal?: boolean;
  closeModal?: () => void;
}

export default function Create({ openModal, closeModal }: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [caption, setCaption] = useState<string>("");
  const { data: session } = useSession();
  const email = session?.user?.email;
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
    } else {
      setSelectedFile(null);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const onSubmit = async () => {
    let data = new FormData();
    if (!selectedFile || !caption || !email) {
      return;
    }
    const validationResult = await validateImage(selectedFile);
    if (!validationResult.isValid) {
      toast.error(validationResult.error);
      validationResult.error && setError(validationResult?.error);
      return;
    }
    data.append("image", selectedFile);
    data.append("caption", caption);
    if (data.has("image") && data.has("caption")) {
      try {
        const response = await fetchData("/api/post", "POST", data);
        if (response.status !== 200) {
          toast.error("Unable to upload image.");
        } else {
          close();
        }
      } catch (error) {
        console.error(error);
      }
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
        {selectedFile ? (
          <CreateWizardContainer>
            <ImageWrapper>
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="selected image"
                width={300}
                height={300}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </ImageWrapper>
            {error ? <Error>{error}</Error> : null}
            <CaptionInput
              onChange={handleCaptionChange}
              placeholder="Add your caption"
            />
            <UploadBtn onClick={onSubmit} $isFileSelected>
              Upload!
            </UploadBtn>
          </CreateWizardContainer>
        ) : (
          <>
            <ImgUpload src={upload.src} alt="Upload" />
            <Input
              ref={inputRef}
              type="file"
              onChange={handleFileInputChange}
              accept="image/png, image/jpeg"
            />
            <UploadBtn
              $isFileSelected={!!selectedFile}
              onClick={handleButtonClick}
            >
              Choose from your device
            </UploadBtn>
          </>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}
