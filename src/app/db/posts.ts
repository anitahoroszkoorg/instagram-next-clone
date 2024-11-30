import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  try {
    const posts = await prisma.post.findMany({
      select: {
        image: true,
      },
    });
    const postsWithBase64Images = posts.map((post) => {
      const base64Image = post.image
        ? `data:image/jpeg;base64,${Buffer.from(post.image).toString("base64")}`
        : null;
      return {
        ...post,
        image: base64Image,
      };
    });
    return postsWithBase64Images;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getAllFollowedPosts = async (userId: any) => {
  const followedUserIds = await prisma.follower.findMany({
    where: {
      follower_instagram_user_id: userId,
    },
  });
  const userIds = followedUserIds.map((f) => f.following_instagram_user_id);
};
