import { NewUser } from "@/globals";
import { prisma } from "../api/_base";

export const addUser = async (data: NewUser) => {
  const { email, password_hash, username, full_name, custom_id } = data;
  await prisma.instagram_user.create({
    data: {
      email: email,
      password_hash: password_hash,
      username: username,
      full_name: full_name,
      custom_id: custom_id,
    },
  });
};

export const getUserId = async (email: string) => {
  const user = await prisma.instagram_user.findUnique({
    where: {
      email: email,
    },
  });
  return user?.user_id;
};
