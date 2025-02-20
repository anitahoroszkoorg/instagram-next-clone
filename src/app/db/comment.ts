import { prisma } from "../api/_base";

export const addComment = async (
  postId: string,
  userId: string,
  comment_text: string,
) => {
  try {
    await prisma.comment.create({
      data: {
        post_id: postId,
        user_id: userId,
        comment_text: comment_text,
      },
    });
  } catch (error) {
    console.error("Error adding a comment", error);
    throw new Error("Failed to add comment");
  } finally {
    await prisma.$disconnect();
  }
};

export const getComments = async (postId: string) => {
  try {
    await prisma.comment.findMany({
      where: {
        post_id: postId,
      },
    });
  } catch (error: any) {
    throw new Error("Failed to fetch comments");
  }
};

export const deleteComment = async (comment_id: string) => {
  try {
    await prisma.comment.delete({
      where: {
        comment_id: comment_id,
      },
    });
  } catch (error) {
    console.error("Error removing the comment", error);
    throw new Error("Failed to delete");
  } finally {
    await prisma.$disconnect();
  }
};
