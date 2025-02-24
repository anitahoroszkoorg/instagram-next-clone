import React, { useState } from "react";
import {
  InputField,
  MainContent,
  Main,
  MaskContainer,
  Caption,
  MaskedImage,
  ActionsSection,
} from "./styled";
import { PostDetails } from "@/shared/types/post";
import { UserDetails } from "@/shared/types/user";
import { fetchData } from "@/app/lib/fetchData";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { Username } from "../Image/styled";
import { StyledButton } from "@/shared/styled/styled";

interface ImageModalProps {
  image: PostDetails;
  userDetails?: UserDetails;
  isProfileOwner?: boolean;
  isEditable?: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  image,
  userDetails,
  isProfileOwner,
  isEditable = false,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string | null>(
    image?.caption,
  );

  const handleEditClick = () => setIsEditing(true);

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
    <Modal
      openModal={!!image}
      closeModal={onClose}
      modalTitle={isEditing ? "Edit your post" : ""}
    >
      <Main>
        <MaskContainer>
          <MaskedImage src={image.image} alt="Masked" />
        </MaskContainer>
        <MainContent>
          <ActionsSection>
            {isEditable ? (
              isEditing ? (
                <>
                  <InputField
                    value={editedCaption || ""}
                    onChange={(e) => setEditedCaption(e.target.value)}
                    placeholder="Edit your caption"
                  />
                  <StyledButton onClick={handleSaveClick}>Save</StyledButton>
                  <StyledButton onClick={() => setIsEditing(false)}>
                    Cancel
                  </StyledButton>
                </>
              ) : (
                <>
                  <Caption>
                    <Username>@{userDetails?.username}: </Username>
                    {editedCaption}
                  </Caption>
                  {isProfileOwner && (
                    <>
                      <StyledButton onClick={handleEditClick}>
                        Edit
                      </StyledButton>
                      <StyledButton onClick={handleDelete}>Delete</StyledButton>
                    </>
                  )}
                </>
              )
            ) : (
              <>
                <Caption>{image.caption}</Caption>
              </>
            )}
          </ActionsSection>
        </MainContent>
      </Main>
    </Modal>
  );
};
