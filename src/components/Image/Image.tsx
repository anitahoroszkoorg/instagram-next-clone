import React from "react";
import { Avatar } from "@mui/material";
import {
  PhotoboxFrame,
  Photo,
  PhotoDetails,
  PhotoDescription,
  Username,
  TagsContainer,
  LikeSection,
  CommentsSection,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import { ImageDetails } from "@/shared/types/image";

interface ImageComponentProps {
  imageDetails: ImageDetails | null;
}

export const Image: React.FC<ImageComponentProps> = ({ imageDetails }) => {
  if (!imageDetails) {
    return null;
  }

  const { image, caption, tags } = imageDetails;

  return (
    <PhotoboxFrame>
      <Photo src={image} alt={caption || "Image"} />
      <PhotoDetails>
        <PhotoDescription>
          <Avatar src="" alt="User Avatar" />
          <Username>{`user${imageDetails.userId}`}</Username>
        </PhotoDescription>
        {caption && <PhotoDescription>{caption}</PhotoDescription>}
        <TagsContainer>
          {tags?.map((tag: string) => `#${tag}`).join(" ")}
        </TagsContainer>
        <LikeSection>
          <FavoriteBorderIcon />
          <SmsOutlinedIcon />
        </LikeSection>
        <CommentsSection>Comments Section</CommentsSection>
      </PhotoDetails>
    </PhotoboxFrame>
  );
};
