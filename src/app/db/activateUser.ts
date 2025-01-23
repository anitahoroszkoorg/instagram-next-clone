import { prisma } from "../api/_base";
import { UserDoesntExistError, UserIsAlreadyActiveError } from "./errors";

export const activateUser = async (user_id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      select: {
        is_active: true,
      },
    });
    if (user === null) {
      throw new UserDoesntExistError("User doesn't exist");
    }
    if (user.is_active) {
      throw new UserIsAlreadyActiveError("User is already activated");
    }
    return await prisma.user.update({
      where: {
        user_id: user_id,
      },
      data: {
        is_active: true,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
