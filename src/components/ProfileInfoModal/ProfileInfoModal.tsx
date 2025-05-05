"use client";
import React, { useState, useEffect } from "react";
import { fetchData } from "@/app/utils/fetchData";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import {
  EditContainer,
  UploadButton,
  InputField,
  ButtonsContainer,
  AvatarWrapper,
} from "./styled";
import Image from "next/image";
import { PostDetails } from "@/shared/types/post";
import { formatImage } from "@/app/utils/formatImage";
import { useMutation } from "@tanstack/react-query";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";

interface ProfileEditModalProps {
  closeModal: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ closeModal }) => {
  const { data: user } = useLoggedInUser();
  const [bio, setBio] = useState<string>(user?.bio || "");
  const [avatar, setAvatar] = useState<string | null>(
    user?.profile_picture || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      if (user.profile_picture) {
        const formattedImage = formatImage({
          image: user.profile_picture,
        } as PostDetails);
        setAvatar(formattedImage.image);
      } else {
        setAvatar("/avatar.jpeg");
      }
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
      setSelectedFile(file);
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

  const mutation = useMutation({
    mutationFn: async () => {
      const userId = user?.user_id;
      if (!userId) throw new Error("User ID is missing");
      let profilePicture: string | undefined;
      if (selectedFile) {
        profilePicture = (await convertFileToBase64(selectedFile)).split(
          ",",
        )[1];
      }
      const updateData: Record<string, string> = { id: userId };
      if (bio !== user?.bio) updateData.bio = bio;
      if (profilePicture) updateData.profile_picture = profilePicture;

      if (Object.keys(updateData).length === 1) {
        throw new Error("No changes made");
      }

      return fetchData("/api/user/", "PATCH", updateData);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      closeModal();
    },
    onError: (error: any) => {
      if (error.message === "No changes made") {
        toast.info("No changes made.");
      } else {
        toast.error("An error occurred while updating your profile.");
      }
    },
  });

  const handleSave = () => {
    mutation.mutate();
  };

  return (
    <Modal openModal closeModal={closeModal} modalTitle="Edit Profile">
      <EditContainer>
        <AvatarWrapper>
          <Image
            width={200}
            height={200}
            priority
            src={avatar || "/avatar.jpeg"}
            alt="User Avatar"
          />
        </AvatarWrapper>
        <>
          <InputField
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Edit your bio. This information will be visible to all users."
          />
          <ButtonsContainer>
            <UploadButton>
              Upload Photo
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </UploadButton>
            <UploadButton onClick={handleSave}>Save</UploadButton>
          </ButtonsContainer>
        </>
      </EditContainer>
    </Modal>
  );
};

export default ProfileEditModal;
