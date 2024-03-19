import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const insertUrltoDb = async (url: string, caption: string) => {
  try {
    await prisma.post.create({
      data: {
        image_url: url,
        caption: caption,
      },
    });
  } catch (error) {
    console.error("Error inserting URL and caption:", error);
  } finally {
    await prisma.$disconnect();
  }
};
