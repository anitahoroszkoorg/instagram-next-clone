import React, { useState } from "react";
import {
  InputField,
  MainContent,
  Main,
  MaskContainer,
  Caption,
  MaskedImage,
  ActionsSection,
  Username,
} from "./styled";
import { PostDetails } from "@/shared/types/post";
import { fetchData } from "@/app/utils/fetchData";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";
import { StyledButton } from "@/shared/styled/styled";
import useFetch from "@/app/hooks/useFetch";

interface ImageModalProps {
  id: string;
  isProfileOwner?: boolean;
  isEditable?: boolean;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  id,
  isProfileOwner,
  isEditable = false,
  onClose,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string | null>(null);
  const { data, loading, error } = useFetch<{ postDetails: PostDetails }>(
    `/api/post/${id}`,
  );

  if (!data || !data.postDetails) return null;
  const post = data.postDetails;

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = async () => {
    if (!editedCaption || editedCaption.trim() === "") {
      return;
    }
    try {
      const response = await fetchData(`/api/post/${id}`, "PATCH", {
        id: id,
        caption: editedCaption,
      });
      if (response.status !== 200) {
        toast.error("Unable to update the caption.");
      } else {
        onClose();
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update caption:", error);
      toast.error("Error updating the caption.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetchData(`/api/post/`, "DELETE", {
        post_id: id,
      });
      if (response.status !== 200) {
        toast.error("Unable to delete the post. Please try again later.");
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete post", error);
      toast.error("Error deleting the post.");
    }
  };

  return (
    <Modal
      openModal={!!id}
      closeModal={onClose}
      modalTitle={isEditing ? "Edit your post" : ""}
    >
      <Main>
        <MaskContainer>
          <MaskedImage src={post.image} alt="Post Image" />
        </MaskContainer>
        <MainContent>
          <ActionsSection>
            {isEditable ? (
              isEditing ? (
                <>
                  <InputField
                    value={editedCaption ?? post.caption}
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
                    <Username>@{post.user?.username}: </Username>
                    {editedCaption ?? post.caption}
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
              <Caption>
                <Username>@{post.user?.username}: </Username>
                {post.caption}
              </Caption>
            )}
          </ActionsSection>
        </MainContent>
      </Main>
    </Modal>
  );
};
