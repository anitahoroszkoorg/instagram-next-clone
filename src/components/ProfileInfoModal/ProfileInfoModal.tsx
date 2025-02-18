import React, { useState } from "react";
import { fetchData } from "@/app/lib/fetchData";
import {
  ModalOverlay,
  ModalContent,
  AvatarPreview,
  EditContainer,
  UploadButton,
  InputField,
  CloseButton,
  SaveButton,
} from "./styled";

interface ProfileEditModalProps {
  userId: string;
  currentBio?: string;
  currentAvatar?: string;
  onClose: () => void;
  onUpdate: (updatedData: { bio: string; avatar: string }) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  userId,
  currentBio = "",
  currentAvatar = "",
  onClose,
  onUpdate,
}) => {
  const [bio, setBio] = useState<string>(currentBio);
  const [avatar, setAvatar] = useState<string>(currentAvatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("id", userId);
      formData.append("bio", bio);
      if (selectedFile) {
        const base64Image = await convertFileToBase64(selectedFile);
        formData.append("profile_picture", base64Image);
      }

      await fetchData(`/api/user/${userId}`, "PATCH", {
        id: userId,
        bio,
        profile_picture: selectedFile ? avatar.split(",")[1] : undefined,
      });

      onUpdate({ bio, avatar });
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <AvatarPreview src={avatar} alt="Profile Preview" />
        <EditContainer>
          <UploadButton>
            Upload Photo
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </UploadButton>
          <InputField
            value={bio}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setBio(e.target.value)}
            placeholder="Edit your bio"
          />
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </EditContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
