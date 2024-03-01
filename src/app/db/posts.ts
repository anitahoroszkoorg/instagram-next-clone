import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const insertUrltoDb = async (url: string, caption: string) => {
  try {
    console.log(url);
    await prisma.post.create({
      data: {
        image_url: url,
        caption: caption,
      },
    });
    console.log("URL and caption inserted successfully.");
  } catch (error) {
    console.error("Error inserting URL and caption:", error);
  } finally {
    await prisma.$disconnect();
  }
};
