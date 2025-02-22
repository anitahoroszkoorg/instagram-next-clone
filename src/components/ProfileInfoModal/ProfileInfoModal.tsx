import React, { useState } from "react";
import { useUser } from "@/app/lib/hooks/userContext";
import { fetchData } from "@/app/lib/fetchData";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import {
  AvatarPreview,
  EditContainer,
  UploadButton,
  InputField,
  SaveButton,
} from "./styled";

interface ProfileEditModalProps {
  closeModal: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ closeModal }) => {
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
      const updateData: Record<string, string> = { id: userId };
      if (bio !== user?.bio) updateData.bio = bio;
      if (profilePicture) updateData.profile_picture = profilePicture;
      const response = await fetchData("/api/user/", "PATCH", updateData);
      if (response.status !== 200) {
        toast.error("Unable to update profile information");
      }
      closeModal();
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
    <Modal openModal closeModal={closeModal} modalTitle="Edit Profile">
      <AvatarPreview src={avatar} alt="Profile Preview" />
      <EditContainer>
        <UploadButton>
          Upload Photo
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </UploadButton>
        <InputField
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Edit your bio. This information will be visible to all users."
        />
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </EditContainer>
    </Modal>
  );
};

export default ProfileEditModal;
