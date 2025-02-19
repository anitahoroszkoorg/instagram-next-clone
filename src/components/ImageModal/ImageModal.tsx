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
import { fetchData } from "@/app/lib/fetchData";
import { toast } from "react-toastify";

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
      const response = await fetchData(`/api/post/${image.post_id}`, "PATCH", {
        id: image.post_id,
        caption: editedCaption,
      });
      if (response.status !== 200) {
        toast.error("Unable to update caption.");
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update caption:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetchData(`/api/post/`, "DELETE", {
        post_id: image.post_id,
      });
      if (response.status !== 200) {
        toast.error("Unable to delete post. Please try again later.");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
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
                  <>
                    <EditButton onClick={handleEditClick}>Edit</EditButton>
                    <EditButton onClick={handleDelete}>Delete</EditButton>
                  </>
                ))}
            </CreateWizardActions>
          </CreateWizardContainer>
        </ModalContent>
      </ModalOverlay>
    </BackDropContainer>
  );
};

export default ImageModal;
