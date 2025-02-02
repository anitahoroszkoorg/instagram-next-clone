import { NewUser } from "@/globals";
import { prisma } from "../api/_base";

export const addUser = async (data: NewUser) => {
  const { email, password_hash, username, full_name } = data;
  return await prisma.user.create({
    data: {
      email: email,
      password_hash: password_hash,
      username: username,
      full_name: full_name,
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

export const getUserDetails = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const getUserDetailsById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: id,
    },
    select: {
      user_id: true,
      full_name: true,
      bio: true,
      username: true,
    },
  });
  return user;
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
