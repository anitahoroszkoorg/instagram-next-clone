import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.instagram_user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  } finally {
    await prisma.$disconnect();
  }
}
