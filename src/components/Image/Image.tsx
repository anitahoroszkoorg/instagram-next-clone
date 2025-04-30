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
  SkeletonAvatar,
  SkeletonText,
  SkeletonImage,
} from "./styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckIcon from "@mui/icons-material/Check";
import Link from "next/link";
import { Like, PostDetails, Comment } from "@/shared/types/post";
import { fetchData } from "@/app/utils/fetchData";
import { formatDate } from "@/app/utils/formatDate";
import { StyledButton, Username } from "@/shared/styled/styled";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { fetchPostDetails } from "@/app/utils/fetchPosts";

type ImageComponentProps = {
  postId: string;
  onClose?: () => void;
};

export const ImageComponent: React.FC<ImageComponentProps> = ({
  postId,
  onClose,
}) => {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["image", postId],
    queryFn: () => fetchPostDetails(postId),
  });
  const postDetails = post?.postDetails;
  const { data: user } = useLoggedInUser();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [newComment, setNewComment] = useState<string>("");
  const [currentComments, setComments] = useState<Comment[]>([]);
  const [currentLikes, setLikes] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedCaption, setEditedCaption] = useState<string>(
    postDetails?.caption || "",
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!postDetails || !user) return;
    setComments(postDetails.comments);
    setLikes(postDetails.likes?.length || 0);
    setIsLiked(
      postDetails.likes?.some((like: Like) => like.user_id === user.user_id) ??
        false,
    );
    setEditedCaption(postDetails.caption || "");
  }, [postDetails?.post_id, user?.user_id]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      await fetchData("/api/like", "POST", {
        post_id: postDetails.post_id,
      });
    },
    onMutate: () => {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    },
    onError: () => {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image", postId] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async () => {
      await fetchData("/api/like", "DELETE", {
        post_id: postDetails?.post_id,
      });
    },
    onMutate: () => {
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    },
    onError: () => {
      setIsLiked(true);
      setLikes((prev) => prev + 1);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image", postId] });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (newCommentText: string) => {
      const response = await fetchData("/api/comment", "POST", {
        post_id: postDetails?.post_id,
        comment_text: newCommentText,
      });
      return response.data as Comment;
    },
    onMutate: (newCommentText) => {
      const optimisticComment: Comment = {
        comment_id: Math.random().toString(),
        comment_text: newCommentText,
        created_at: new Date().toISOString(),
        user_id: user?.user_id || "",
        user: { username: user?.username || "" },
      };
      setComments((prev) => [optimisticComment, ...prev]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postDetails?.post_id],
      });
      queryClient.invalidateQueries({ queryKey: ["image", postId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      await fetchData("/api/comment", "DELETE", { comment_id: commentId });
    },
    onMutate: (commentId) => {
      setComments((prev) =>
        prev.filter((comment) => comment.comment_id !== commentId),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", postDetails?.post_id],
      });
      queryClient.invalidateQueries({ queryKey: ["image", postId] });
    },
  });

  const editCaptionMutation = useMutation({
    mutationFn: async () => {
      await fetchData("/api/post", "PATCH", {
        id: postDetails?.post_id,
        caption: editedCaption,
      });
    },
    onSuccess: async () => {
      setIsEditing(false);
      if (onClose) onClose();
      queryClient.invalidateQueries({ queryKey: ["image", postId] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async () => {
      await fetchData("/api/post", "DELETE", { post_id: postDetails?.post_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image", postId] });
      if (onClose) onClose();
    },
  });

  return (
    <PhotoboxFrame>
      {isLoading ? (
        <>
          <Section>
            <SkeletonAvatar />
          </Section>
          <MaskContainer>
            <SkeletonImage />
          </MaskContainer>
          <Section>
            <SkeletonText />
          </Section>
          <Section>
            <SkeletonText />
          </Section>
          <CommentsSection>
            {[...Array(3)].map((_, index) => (
              <CommentItem key={index}>
                <SkeletonText />
              </CommentItem>
            ))}
          </CommentsSection>
          <CommentsInputContainer>
            <SkeletonText />
          </CommentsInputContainer>
        </>
      ) : (
        <>
          <Section>
            <Link href={`/profile/${postDetails?.user_id}`}>
              <UserDetails>
                <Avatar
                  src={postDetails?.user?.profile_image || "/avatar.jpeg"}
                />
                <Username>{postDetails?.user?.username}</Username>
              </UserDetails>
            </Link>
          </Section>
          <MaskContainer>
            <MaskedImage src={postDetails?.image} alt="Masked" />
          </MaskContainer>
          <Section>
            {isLiked ? (
              <FavoriteIcon
                onClick={() => unlikeMutation.mutate()}
                style={{ color: "red", cursor: "pointer" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={() => likeMutation.mutate()}
                style={{ cursor: "pointer" }}
              />
            )}
            <span>
              {currentLikes} {currentLikes === 1 ? "like" : "likes"}
            </span>
            <ChatBubbleOutlineIcon
              style={{ color: "grey", padding: "0.1em" }}
            />
            <span>{currentComments.length}</span>
            {user?.user_id === postDetails?.user_id && (
              <>
                <Button onClick={() => deletePostMutation.mutate()}>
                  <DeleteOutlineIcon
                    style={{ color: "grey", padding: "0.1em" }}
                  />
                </Button>
                {isEditing ? (
                  <Button onClick={() => editCaptionMutation.mutate()}>
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
            <Link href={`/profile/${postDetails?.user_id}`}>
              <UserDetails>
                <Avatar
                  src={postDetails?.user?.profile_image || "/avatar.jpeg"}
                />
                <Username>{postDetails?.user.username}</Username>
              </UserDetails>
            </Link>
            {isEditing ? (
              <CaptionInput
                value={editedCaption}
                onChange={(e) => setEditedCaption(e.target.value)}
              />
            ) : (
              <Caption>{postDetails?.caption}</Caption>
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
                  <Button
                    onClick={() => {
                      if (comment.comment_id) {
                        deleteCommentMutation.mutate(comment.comment_id);
                      }
                    }}
                  >
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
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <StyledButton onClick={() => addCommentMutation.mutate(newComment)}>
              Post
            </StyledButton>
          </CommentsInputContainer>
        </>
      )}
    </PhotoboxFrame>
  );
};
