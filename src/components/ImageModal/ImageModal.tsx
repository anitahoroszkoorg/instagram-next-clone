import React, { useState } from "react";
import {
  BackDropContainer,
  EditButton,
  InputField,
  SaveButton,
  CloseButton,
  CreateWizardActions,
  CreateWizardContainer,
  ModalContent,
  ModalOverlay,
} from "./styled";
import { Caption } from "../Image/styled";
import { Image } from "./styled";
import { PostDetails } from "@/shared/types/post";
import { UserDetails } from "@/shared/types/user";

interface ImageModalProps {
  image: PostDetails;
  userDetails: UserDetails;
  isProfileOwner: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  image,
  userDetails,
  isProfileOwner,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(image.caption);

  const handleEditClick = () => setIsEditing(true);

  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`/api/post/${image.post_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: image.post_id,
          caption: editedCaption,
        }),
      });

      const text = await response.text();
      console.log("Raw API Response:", text);

      if (!response.ok) {
        throw new Error(
          `Failed to update caption: ${response.status} - ${text}`,
        );
      }

      const updatedPost = text ? JSON.parse(text) : null;
      if (!updatedPost) {
        throw new Error("Invalid response received from server");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update caption:", error);
    }
  };

  return (
    <BackDropContainer visible={!!image} onClick={onClose}>
      <ModalOverlay>
        <ModalContent onClick={handleModalContentClick}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Image src={image.image} alt="Selected" />
          <CreateWizardContainer>
            <CreateWizardActions>
              {isEditing ? (
                <InputField
                  value={editedCaption}
                  onChange={(e) => setEditedCaption(e.target.value)}
                  placeholder="Edit your caption"
                />
              ) : (
                <Caption>
                  @{userDetails.username}: {editedCaption}
                </Caption>
              )}
              {isProfileOwner &&
                (isEditing ? (
                  <SaveButton onClick={handleSaveClick}>Save</SaveButton>
                ) : (
                  <EditButton onClick={handleEditClick}>Edit</EditButton>
                ))}
            </CreateWizardActions>
          </CreateWizardContainer>
        </ModalContent>
      </ModalOverlay>
    </BackDropContainer>
  );
};

export default ImageModal;
