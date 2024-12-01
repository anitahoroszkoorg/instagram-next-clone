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
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

interface Props {
  modalVisible?: boolean;
  setModalVisible?: (modalVisible: boolean) => void;
  selectedImage: string;
}

export const Post: React.FC<Props> = ({
  modalVisible,
  setModalVisible,
  selectedImage,
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam,
            exercitationem vero? Quam vero quia facilis necessitatibus expedita!
          </PhotoDescription>
          <TagsContainer>#lkn#ljndfljn#ibsfkjb#kjbsdjbc</TagsContainer>
          <LikeSection>
            <FavoriteBorderIcon />
            {likesCount}
            <SmsOutlinedIcon />
            {likesCount}
            <BookmarkBorderOutlinedIcon />
            {likesCount}
          </LikeSection>
          <CommentsSection>comment xd</CommentsSection>
        </PhotoDetails>
      </PhotoboxFrame>
    </BackDropContainer>
  );
};
