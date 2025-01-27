import { prisma } from "../api/_base";

export const insertImageToDb = async (
  image: Buffer,
  caption: string,
  userId: string,
) => {
  try {
    await prisma.post.create({
      data: {
        image: image,
        caption: caption,
        user_id: userId,
      },
    });
  } catch (error) {
    console.error("Error inserting post", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const getAllPostsByFollowedUsers = async (email: string) => {
  const posts = await prisma.post.findMany({
    where: {
      user: {
        followers: {
          some: {
            follower: {
              email,
            },
          },
        },
      },
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      likes: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      comments: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  prisma.$disconnect;
  const formattedPosts = posts.map((post) => ({
    ...post,
    image:
      post.image && Buffer.from(post.image).toString("base64")
        ? `data:image/jpeg;base64,${Buffer.from(post.image).toString("base64")}`
        : null,
  }));

  return formattedPosts;
};
