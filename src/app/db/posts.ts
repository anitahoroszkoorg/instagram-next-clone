import { prisma } from "../api/_base";
import { getFollowedUsers } from "./users";

export const insertImageToDb = async (
  image: Buffer,
  caption: string,
  userId: number,
) => {
  try {
    await prisma.post.create({
      data: {
        image: image,
        caption: caption,
        instagram_user_id: userId,
      },
    });
  } catch (error) {
    console.error("Error inserting post", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      image: true,
    },
  });
  const formattedPosts = posts.map((post) => ({
    ...post,
    image: `data:image/jpeg;base64,${post?.image?.toString("base64")}`,
  }));
  return formattedPosts;
};

export const getAllPostsByFollowedUsers = async (email: string) => {
  const followedUsers = await getFollowedUsers(email);
  const followedUsersId = followedUsers
    .map((followedUser) => followedUser.following_instagram_user_id)
    .filter((id): id is number => id !== null);
  const posts = await prisma.post.findMany({
    where: {
      instagram_user_id: { in: followedUsersId },
    },
  });
  const formattedPosts = posts.map((post) => ({
    ...post,
    image: `data:image/jpeg;base64,${post?.image?.toString("base64")}`,
  }));
  return formattedPosts;
};
