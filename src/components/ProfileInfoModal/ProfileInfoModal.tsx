"use client";
import React, { useState } from "react";
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
import { useUser } from "@/app/lib/hooks/userContext";

interface ProfileEditModalProps {
  onClose: () => void;
  onUpdate: (updatedData: { bio: string; avatar: string }) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  onClose,
  onUpdate,
}) => {
  const { user } = useUser();
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [avatar, setAvatar] = useState<string>(user?.profile_picture || "");
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
      const userId = user?.user_id;
      if (!userId) return;

      let profilePicture: string | undefined;
      if (selectedFile) {
        profilePicture = (await convertFileToBase64(selectedFile)).split(
          ",",
        )[1];
      }
      const updateData: Record<string, any> = { id: userId };
      if (bio !== user?.bio) updateData.bio = bio;
      if (profilePicture) updateData.profile_picture = profilePicture;
      const res = await fetch(`/api/user/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
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
            onChange={(e) => setBio(e.target.value)}
            placeholder="Edit your bio"
          />
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </EditContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileEditModal;
