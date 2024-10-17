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

//instead of navigating them to the page, you can show a modal keeping the other products in the background and in my opinion creating a smoother experience. Now you can use a client-side modal for this, but if your customer tries to share the URL of your product by copying it from the search bar, it will only navigate them to the products page instead of the actual product.

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
  const likesCount = 5;
  return (
    <BackDropContainer
      style={{ display: modalVisible ? "flex" : "none" }}
      onClick={() => handleBackdropClick}
    >
      <PhotoboxFrame>
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
