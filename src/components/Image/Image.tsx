"use client";
import React, { useEffect, useState } from "react";
import {
  PhotoboxFrame,
  Section,
  CommentsSection,
  CommentItem,
  CommentsInputContainer,
  Avatar,
  Input,
  Button,
  Caption,
  MaskedImage,
  MaskContainer,
  UserDetails,
  CaptionInput,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { Like, PostDetails, Comment } from "@/shared/types/post";
import { fetchData } from "@/app/utils/fetchData";
import { useUser } from "@/app/hooks/userContext";
import { formatDate } from "@/app/utils/formatDate";
import { StyledButton, Username } from "@/shared/styled/styled";

interface ImageComponentProps {
  postDetails: PostDetails | null;
  onClose?: () => void;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  postDetails,
  onClose,
}) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [currentComments, setComments] = useState<Comment[]>([]);
  const [currentLikes, setLikes] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string>(
    postDetails?.caption || "",
  );

  useEffect(() => {
    if (postDetails) {
      setComments(postDetails.comments);
      setLikes(postDetails.likes?.length || 0);
      if (postDetails.likes && user) {
        const userHasLiked = postDetails.likes.some(
          (like: Like) => like.user_id === user.user_id,
        );
        setIsLiked(userHasLiked);
      }
    }
  }, [postDetails, user]);

  const likePost = async () => {
    if (!postDetails) return;
    setIsLiked(true);
    setLikes((prev) => prev + 1);
    try {
      await fetchData("/api/like", "POST", { post_id: postDetails.post_id });
    } catch {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
      toast.error("Unable to like");
    }
  };

  const unlikePost = async () => {
    if (!postDetails) return;
    setIsLiked(false);
    setLikes((prev) => prev - 1);
    try {
      await fetchData("/api/like", "DELETE", { post_id: postDetails.post_id });
    } catch {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
      toast.error("Unable to unlike");
    }
  };

  const handleAddComment = async () => {
    if (!user || !postDetails || !newComment.trim()) return;
    const optimisticComment: Comment = {
      comment_id: Math.random().toString(),
      comment_text: newComment,
      created_at: new Date().toISOString(),
      user_id: user.user_id,
      user: { username: user.username },
    };

    setComments((prev) => [optimisticComment, ...prev]);
    setNewComment("");

    try {
      await fetchData("/api/comment", "POST", {
        post_id: postDetails.post_id,
        comment_text: newComment,
      });
    } catch {
      setComments((prev) =>
        prev.filter(
          (comment) => comment.comment_id !== optimisticComment.comment_id,
        ),
      );
      toast.error("Failed to add comment");
    }
  };

  const handleDeleteComment = async (id: string | undefined) => {
    if (!id) return;
    try {
      await fetchData("/api/comment", "DELETE", { comment_id: id });
      setComments((prev) =>
        prev.filter((comment) => comment.comment_id !== id),
      );
    } catch {
      toast.error("Unable to delete comment");
    }
  };

  const handleDelete = async () => {
    if (!postDetails?.post_id) return;

    try {
      const response = await fetchData("/api/post/", "DELETE", {
        post_id: postDetails.post_id,
      });

      if (response.status !== 200) {
        toast.error("Unable to delete the post. Please try again later.");
        return;
      }

      toast.success("Post deleted successfully!");
      if (onClose) onClose();
    } catch (error) {
      console.error("Failed to delete post", error);
      toast.error("Error deleting the post.");
    }
  };

  const handleSave = async () => {
    if (!postDetails?.post_id) return;
    if (editedCaption === postDetails.caption) {
      setIsEditing(false);
      return;
    }
    try {
      const response = await fetchData("/api/post", "PATCH", {
        id: postDetails.post_id,
        caption: editedCaption,
      });
      if (response.status === 200) {
        toast.success("Post updated successfully!");
        postDetails.caption = editedCaption;
      } else {
        toast.error("Failed to update the post.");
      }
    } catch (error) {
      console.error("Error updating post", error);
      toast.error("Error updating the post.");
    }
    setIsEditing(false);
  };

  if (!postDetails) return null;

  return (
    <>
      <ToastContainer />
      <PhotoboxFrame>
        <Section>
          <Link href={`/profile/${postDetails.user_id}`}>
            <UserDetails>
              <Avatar src={postDetails.user.profile_image || "/avatar.jpeg"} />
              <Username>{postDetails.user.username}</Username>
            </UserDetails>
          </Link>
        </Section>
        <MaskContainer>
          <MaskedImage src={postDetails.image} alt="Masked" />
        </MaskContainer>
        <Section>
          {isLiked ? (
            <FavoriteIcon
              onClick={unlikePost}
              style={{ color: "red", cursor: "pointer" }}
            />
          ) : (
            <FavoriteBorderIcon
              onClick={likePost}
              style={{ cursor: "pointer" }}
            />
          )}
          <span>
            {currentLikes} {currentLikes === 1 ? "like" : "likes"}
          </span>
          <ChatBubbleOutlineIcon style={{ color: "grey", padding: "0.1em" }} />
          <span>{currentComments.length}</span>
          {user?.user_id === postDetails.user_id && (
            <>
              <Button onClick={() => handleDelete()}>
                <DeleteOutlineIcon
                  style={{ color: "grey", padding: "0.1em" }}
                />
              </Button>
              {isEditing ? (
                <Button onClick={handleSave}>
                  <CheckIcon style={{ color: "grey", padding: "0.1em" }} />
                </Button>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <EditIcon style={{ color: "grey", padding: "0.1em" }} />
                </Button>
              )}
            </>
          )}
        </Section>
        <Section>
          <Link href={`/profile/${postDetails.user_id}`}>
            <UserDetails>
              <Avatar src={postDetails.image} />
              <Username>{postDetails.user.username}</Username>
            </UserDetails>
          </Link>
          {isEditing ? (
            <CaptionInput
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
            />
          ) : (
            <Caption>{postDetails.caption}</Caption>
          )}
        </Section>
        <CommentsSection>
          {currentComments.map((comment) => (
            <CommentItem key={comment.comment_id}>
              <Link href={`/profile/${comment.user_id}`}>
                <Username>{comment.user.username}:</Username>
              </Link>
              <Caption>{comment.comment_text}</Caption>
              <p>{formatDate(comment.created_at)}</p>
              {comment.user_id === user?.user_id && (
                <Button onClick={() => handleDeleteComment(comment.comment_id)}>
                  <DeleteOutlineIcon
                    style={{ color: "grey", padding: "0.2em" }}
                  />
                </Button>
              )}
            </CommentItem>
          ))}
        </CommentsSection>
        <CommentsInputContainer>
          <Input
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <StyledButton
            disabled={!newComment.trim()}
            onClick={handleAddComment}
          >
            Add
          </StyledButton>
        </CommentsInputContainer>
      </PhotoboxFrame>
    </>
  );
};
