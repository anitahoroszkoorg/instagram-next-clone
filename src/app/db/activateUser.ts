import { PrismaClient } from "@prisma/client";

export const activateUser = async (custom_id: string) => {
  //checking if user is already activated
  const prisma = new PrismaClient();
  return await prisma.instagram_user.update({
    where: {
      custom_id: custom_id,
    },
    data: {
      is_active: true,
    },
  });
};
