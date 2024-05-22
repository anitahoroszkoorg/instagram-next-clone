import { PrismaClient } from "@prisma/client";

export const activateUser = async (custom_id: string) => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.instagram_user.findUnique({
      where: {
        custom_id: custom_id,
      },
      select: {
        is_active: true,
      },
    });
    if (user?.is_active) {
      throw new Error("User is already activated");
    }
    const updatedUser = await prisma.instagram_user.update({
      where: {
        custom_id: custom_id,
      },
      data: {
        is_active: true,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
