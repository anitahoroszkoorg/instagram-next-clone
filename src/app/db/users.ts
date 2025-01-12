import { NewUser } from "@/globals";
import { prisma } from "../api/_base";

export const addUser = async (data: NewUser) => {
  const { email, password_hash, username, full_name, user_id } = data;
  console.log("add user");
  console.log(data);

  await prisma.user.create({
    data: {
      email: email,
      password_hash: password_hash,
      username: username,
      full_name: full_name,
      user_id: user_id,
    },
  });
};

export const getUserId = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user?.user_id;
};
export const getFollowedUsers = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const id = user?.user_id;
  const followedUsers = await prisma.follow.findMany({
    where: {
      following_user_id: id,
    },
  });
  return followedUsers;
};

export const getFollowingUsers = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const id = user?.user_id;
  const followingUsers = await prisma.follow.findMany({
    where: {
      following_user_id: id,
    },
  });
  return followingUsers;
};
