import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findUniqueId = async (id: string) => {
  await prisma.instagram_user.findFirst({
    where: {
      custom_id: id,
    },
  });
};
