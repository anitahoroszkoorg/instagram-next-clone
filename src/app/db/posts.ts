import { PostDetails } from "@/shared/types/post";
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
    prisma.$disconnect();
  }
};

export const deleteImagefromDb = async (id: string) => {
  try {
    await prisma.post.delete({
      where: {
        post_id: id,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
};

export const updatePostInDb = async (
  post_id: string,
  data: Partial<
    Omit<
      PostDetails,
      | "created_at"
      | "image"
      | "post_id"
      | "user_id"
      | "likes"
      | "comments"
      | "user"
    >
  >,
) => {
  try {
    const updatedPost = await prisma.post.update({
      where: { post_id },
      data,
    });
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
};

export const getPostDetails = async (post_id: string) => {
  try {
    const postDetails = await prisma.post.findUnique({
      where: { post_id },
      include: {
        user: { select: { username: true } },
        likes: {
          include: {
            user: { select: { username: true, profile_picture: true } },
          },
        },
        comments: { include: { user: { select: { username: true } } } },
      },
    });
    if (!postDetails) {
      throw new Error("Post not found");
    }
    const formattedPost = {
      ...postDetails,
      image: postDetails.image
        ? `data:image/jpeg;base64,${Buffer.from(postDetails.image).toString(
            "base64",
          )}`
        : null,
    };
    return formattedPost;
  } catch (error) {
    console.error("Error finding post details", error);
    throw new Error("Failed to find post details");
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

export const getPostsByUserId = async (id: string) => {
  const posts = await prisma.post.findMany({
    where: {
      user_id: id,
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

export const getAllPublicPostsFromDb = async () => {
  const publicPosts = await prisma.post.findMany({
    where: {
      user: {
        public: "public",
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
              profile_picture: true,
              user_id: true,
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

  const formattedPosts = publicPosts.map((post) => ({
    ...post,
    image:
      post.image && Buffer.from(post.image).toString("base64")
        ? `data:image/jpeg;base64,${Buffer.from(post.image).toString("base64")}`
        : null,
  }));

  return formattedPosts;
};
