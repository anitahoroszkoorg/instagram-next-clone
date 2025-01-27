import { prisma } from "../api/_base";

export const addLike = async (postId: string, userId: string) => {
  try {
    await prisma.like.create({
      data: {
        post_id: postId,
        user_id: userId,
      },
    });
  } catch (error) {
    console.error("Error adding a like", error);
    throw new Error("Failed to add like");
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteLike = async (postId: string, userId: string) => {
  try {
    await prisma.like.deleteMany({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });
  } catch (error) {
    console.error("Error adding a like", error);
    throw new Error("Failed to add like");
  } finally {
    await prisma.$disconnect();
  }
};
