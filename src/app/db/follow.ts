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

export const removeFollower = async (user_id: string, id: string) => {
  try {
    await prisma.follow.deleteMany({
      where: {
        following_user_id: user_id,
        followed_user_id: id,
      },
    });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw new Error("Failed to unfollow user");
  } finally {
    await prisma.$disconnect();
  }
};

export const getFollowers = async (id: string) => {
  const followers = await prisma.follow.findMany({
    where: {
      followed_user_id: id,
    },
    select: {
      follower: {
        select: {
          user_id: true,
          username: true,
        },
      },
    },
  });
  prisma.$disconnect;
  return followers.map((f) => f.follower);
};

export const getFollowed = async (id: string) => {
  const followed = await prisma.follow.findMany({
    where: {
      following_user_id: id,
    },
    select: {
      followed: {
        select: {
          user_id: true,
          username: true,
        },
      },
    },
  });
  prisma.$disconnect;
  return followed.map((f) => f.followed);
};
