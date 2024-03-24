import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { addUser } from "@/app/db/users";
import { NewUser } from "@/globals";
import { validateAddUserData } from "@/app/schemas/addUserSchema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//when user tries to register first check if he exists in the database, if exists give notification to log in instead, if the user doesn't exist send him email to verify registration

export async function POST(request: Request) {
  try {
    const { email, password, username, full_name } = await request.json();
    const checkExisitngUser = await prisma.instagram_user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkExisitngUser) {
      return NextResponse.redirect("/pages/login");
    }
    const hashedPassword = await hash(password, 10);
    const user: NewUser = {
      email: email,
      password_hash: hashedPassword,
      username: username,
      full_name: full_name,
    };
    const { error, values } = validateAddUserData(user);
    if (error) {
      console.error(error);
    } else {
      addUser(values);
    }
  } catch (e) {
    console.log({ e });
  }
  return NextResponse.json({ message: "success" });
}
