import { NewUser } from "@/globals";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
