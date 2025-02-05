import { prisma } from "../api/_base";

export const followUser = async (user_id: string, id: string) => {
  try {
    await prisma.follow.create({
      data: {
        followed_user_id: user_id,
        following_user_id: id,
      },
    });
  } catch (error) {
    console.error("Error following user:", error);
    throw new Error("Failed to follow user");
  } finally {
    await prisma.$disconnect();
  }
};

export const removeFollow = async (user_id: string, id: string) => {
  try {
    await prisma.follow.deleteMany({
      where: {
        followed_user_id: user_id,
        following_user_id: id,
      },
    });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw new Error("Failed to unfollow user");
  } finally {
    await prisma.$disconnect();
  }
};
