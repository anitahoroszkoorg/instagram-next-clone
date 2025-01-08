import React from "react";
import {
  Avatar,
  BackDropContainer,
  CommentsSection,
  LikeSection,
  Photo,
  PhotoDescription,
  PhotoDetails,
  PhotoboxFrame,
  TagsContainer,
  Username,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";

interface Props {
  modalVisible?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
  selectedImage: string;
  details: {
    caption?: string;
    tags?: string[];
    userId: number;
    createdAt: string;
    postId: number;
  } | null;
}

export const Post: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
  selectedImage,
  details,
}) => {
  const handleBackdropClick = () => {
    if (setModalVisible) {
      setModalVisible(false);
    }
  };

  const handlePhotoboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const likesCount = 5;

  return (
    <BackDropContainer
      style={{ display: modalVisible ? "flex" : "none" }}
      onClick={handleBackdropClick}
    >
      <PhotoboxFrame onClick={handlePhotoboxClick}>
        <Photo src={selectedImage} alt="photo" />
        <PhotoDetails>
          <PhotoDescription>
            <Avatar src="" />
            <Username>user45532</Username>
          </PhotoDescription>
          <PhotoDescription>
            {details?.caption ? details?.caption : null}
          </PhotoDescription>
          <TagsContainer>#lkn#ljndfljn#ibsfkjb#kjbsdjbc</TagsContainer>
          <LikeSection>
            <FavoriteBorderIcon />
            {likesCount}
            <SmsOutlinedIcon />
            {likesCount}
          </LikeSection>
          <CommentsSection>comment</CommentsSection>
        </PhotoDetails>
      </PhotoboxFrame>
    </BackDropContainer>
  );
};
