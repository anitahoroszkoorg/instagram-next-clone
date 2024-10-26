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
