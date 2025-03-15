import { NewUser, User } from "@/shared/types/user";
import { prisma } from "../api/_base";

export const getUsers = async (query: string) => {
  return await prisma.user.findMany({
    where: {
      username: { contains: query, mode: "insensitive" },
    },
    select: {
      user_id: true,
      full_name: true,
      bio: true,
      username: true,
    },
  });
};

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

export const editUser = async (
  user_id: string,
  data: Partial<Omit<User, "user_id" | "created_at">>,
) => {
  if (Object.keys(data).length === 0) {
    throw new Error("No valid fields provided for update.");
  }
  const updateData: any = { ...data };
  if (data.profile_picture) {
    updateData.profile_picture = {
      set: Buffer.from(data.profile_picture, "base64"),
    };
  }
  return await prisma.user.update({
    where: { user_id },
    data: updateData,
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
  return await prisma.user.findUnique({
    where: {
      user_id: id,
    },
    select: {
      user_id: true,
      full_name: true,
      bio: true,
      username: true,
      profile_picture: true,
    },
  });
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
