import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface NewUser {
  email: string;
  password_hash: string;
  username: string;
  full_name: string;
}

export const addUser = async (data: NewUser) => {
  try {
    console.log(data);
    const { email, password_hash, username, full_name } = data;
    await prisma.instagram_user.create({
      data: {
        email: email,
        password_hash: password_hash,
        username: username,
        full_name: full_name,
      },
    });
    console.log("User added succesfully to database");
  } catch (error) {
    console.error("Error", error);
  } finally {
    await prisma.$disconnect();
  }
};
