import React, { useState } from "react";
import {
  FeedWrapper,
  Photobox,
  BackDropContainer,
  EditButton,
  InputField,
  SaveButton,
} from "./styled";
import useFetch from "@/app/lib/hooks/useFetch";
import { Post, PostDetails } from "@/shared/types/post";
import { fetchData } from "@/app/lib/fetchData";
import {
  CloseButton,
  CreateWizardActions,
  CreateWizardContainer,
  ModalContent,
  ModalOverlay,
} from "../Create/styled";
import { Caption } from "../Image/styled";
import { Image } from "./styled";
interface ImageGridProps {
  id: string;
}

export const ImagesGrid: React.FC<ImageGridProps> = ({ id }) => {
  const { data, loading, error } = useFetch<Post>(`/api/images/${id}`);
  const [selectedImage, setSelectedImage] = useState<PostDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState("");

  const openModal = (image: PostDetails) => {
    setSelectedImage(image);
    setEditedCaption(image.caption);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!selectedImage) return;
    try {
      const response = await fetch(`/api/posts/${selectedImage.post_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedImage.post_id,
          caption: editedCaption,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update caption");
      }
      const updatedPost = await response.json();
      setSelectedImage(
        (prev) => prev && { ...prev, caption: updatedPost.caption },
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update caption:", error);
    }
  };

  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <FeedWrapper>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!!data && data.posts.length > 0
          ? data.posts.map((image) => (
              <Photobox
                key={image.post_id}
                src={image.image}
                alt="photo"
                onClick={() => openModal(image)}
              />
            ))
          : !loading && <p>No posts available</p>}
      </FeedWrapper>
      {selectedImage && (
        <BackDropContainer visible={!!selectedImage} onClick={closeModal}>
          <ModalOverlay>
            <ModalContent onClick={handleModalContentClick}>
              <CloseButton onClick={closeModal}>×</CloseButton>
              <Image src={selectedImage.image} alt="Selected" />

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
                      <strong>
                        @{selectedImage.user?.username || "Unknown"}
                      </strong>
                      : {selectedImage.caption}
                    </Caption>
                  )}

                  {isEditing ? (
                    <SaveButton onClick={handleSaveClick}>Save</SaveButton>
                  ) : (
                    <EditButton onClick={handleEditClick}>Edit</EditButton>
                  )}
                </CreateWizardActions>
              </CreateWizardContainer>
            </ModalContent>
          </ModalOverlay>
        </BackDropContainer>
      )}
    </>
  );
};
