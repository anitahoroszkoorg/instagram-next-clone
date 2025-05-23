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
          profile_picture: true,
        },
      },
    },
  });
  prisma.$disconnect();
  const uniqueFollowers = Array.from(
    new Map(followers.map((f) => [f.follower.user_id, f.follower])).values(),
  );
  return uniqueFollowers;
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
          profile_picture: true,
        },
      },
    },
  });
  prisma.$disconnect();
  const uniqueFollowed = Array.from(
    new Map(followed.map((f) => [f.followed.user_id, f.followed])).values(),
  );
  return uniqueFollowed;
};
