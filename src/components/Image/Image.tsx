"use client";
import React, { useState } from "react";
import {
  PhotoboxFrame,
  Section,
  CommentsSection,
  CommentItem,
  CommentsInputContainer,
  Input,
  Button,
  Caption,
  MaskedImage,
  MaskContainer,
  CaptionInput,
  SkeletonAvatar,
  SkeletonText,
  SkeletonImage,
} from "./styled";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
  Edit as EditIcon,
  DeleteOutline as DeleteOutlineIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { fetchPostDetails } from "@/app/utils/fetchPosts";
import { fetchData } from "@/app/utils/fetchData";
import { formatDate } from "@/app/utils/formatDate";
import { StyledButton, Username } from "@/shared/styled/styled";
import { v4 as uuidv4 } from "uuid";
import { Like, Comment } from "@/shared/types/post";
import { UserLink } from "../UserLink/UserLink";

const QUERY_KEYS = {
  IMAGE: "image",
  POST: "post",
};

type ImageComponentProps = {
  postId: string;
  onClose?: () => void;
};

export const ImageComponent: React.FC<ImageComponentProps> = ({
  postId,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { data: user } = useLoggedInUser();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.IMAGE, postId],
    queryFn: () => fetchPostDetails(postId),
  });
  const postDetails = post?.postDetails;

  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(
    postDetails?.caption || "",
  );
  const comments = postDetails?.comments || [];
  const likesCount = postDetails?.likes?.length || 0;
  const isLiked =
    postDetails?.likes?.some((like: Like) => like.user_id === user?.user_id) ??
    false;

  const likeMutation = useMutation({
    mutationFn: () =>
      fetchData("/api/like", "POST", { post_id: postDetails?.post_id }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGE, postId] }),
  });

  const unlikeMutation = useMutation({
    mutationFn: () =>
      fetchData("/api/like", "DELETE", { post_id: postDetails?.post_id }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGE, postId] }),
  });

  const addCommentMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetchData("/api/comment", "POST", {
        post_id: postDetails?.post_id,
        comment_text: text,
      });
      return response.data as Comment;
    },
    onMutate: (text: string) => {
      const optimisticComment: Comment = {
        comment_id: uuidv4(),
        comment_text: text,
        created_at: new Date().toISOString(),
        user_id: user?.user_id || "",
        user: { username: user?.username || "" },
      };
      queryClient.setQueryData([QUERY_KEYS.IMAGE, postId], (old: any) => {
        const updated = { ...old };
        updated.postDetails.comments = [optimisticComment, ...comments];
        return updated;
      });
    },
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGE, postId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) =>
      fetchData("/api/comment", "DELETE", { comment_id: commentId }),
    onMutate: (commentId) => {
      queryClient.setQueryData([QUERY_KEYS.IMAGE, postId], (old: any) => {
        const updated = { ...old };
        updated.postDetails.comments = comments.filter(
          (c: Comment) => c.comment_id !== commentId,
        );
        return updated;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGE, postId] });
    },
  });

  const editCaptionMutation = useMutation({
    mutationFn: () =>
      fetchData("/api/post", "PATCH", {
        id: postDetails?.post_id,
        caption: editedCaption,
      }),
    onSuccess: () => {
      setIsEditing(false);
      onClose?.();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGE, postId] });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: () =>
      fetchData("/api/post", "DELETE", { post_id: postDetails?.post_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.IMAGE, postId] });
      onClose?.();
    },
  });

  if (error) {
    return (
      <PhotoboxFrame>
        <Section role="alert">
          <p>Failed to load post.</p>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.IMAGE, postId],
              })
            }
          >
            Retry
          </Button>
        </Section>
      </PhotoboxFrame>
    );
  }

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
            {Array.from({ length: 3 }).map((_, i) => (
              <CommentItem key={i}>
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
            {postDetails?.user && (
              <UserLink
                user={{ ...postDetails.user, user_id: postDetails.user_id }}
              />
            )}
          </Section>
          <MaskContainer>
            <MaskedImage src={postDetails?.image} alt="Post image" />
          </MaskContainer>
          <Section>
            <Button
              onClick={() =>
                isLiked ? unlikeMutation.mutate() : likeMutation.mutate()
              }
            >
              {isLiked ? (
                <FavoriteIcon aria-label="Unlike" style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon aria-label="Like" />
              )}
            </Button>
            <span>
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </span>
            <ChatBubbleOutlineIcon
              style={{ color: "grey", marginLeft: "0.5em" }}
            />
            <span>{comments.length}</span>

            {user?.user_id === postDetails?.user_id && (
              <>
                <Button onClick={() => deletePostMutation.mutate()}>
                  <DeleteOutlineIcon />
                </Button>
                {isEditing ? (
                  <Button onClick={() => editCaptionMutation.mutate()}>
                    <CheckIcon />
                  </Button>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </Button>
                )}
              </>
            )}
          </Section>
          <Section>
            {postDetails?.user && (
              <UserLink
                user={{ ...postDetails.user, user_id: postDetails.user_id }}
              />
            )}
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
            {[...comments].reverse().map((comment: Comment) => (
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
                    <DeleteOutlineIcon />
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && newComment.trim()) {
                  e.preventDefault();
                  addCommentMutation.mutate(newComment.trim());
                  setNewComment("");
                }
              }}
            />
            <StyledButton
              onClick={() => {
                if (newComment.trim()) {
                  addCommentMutation.mutate(newComment.trim());
                  setNewComment("");
                }
              }}
            >
              Post
            </StyledButton>
          </CommentsInputContainer>
        </>
      )}
    </PhotoboxFrame>
  );
};
