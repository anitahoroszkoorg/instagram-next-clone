import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { addUser } from "@/app/db/users";
import { NewUser } from "@/globals";
import { validateAddUserData } from "@/app/schemas/addUserSchema";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
export async function POST(request: Request) {
  const requestData = await request.json();
  if (!requestData) {
    throw new Error("Request data is missing.");
  }
  const { email, password, username, full_name } = requestData;
  const hashedPassword = await hash(password, 10);
  const user: NewUser = {
    email: email,
    password_hash: hashedPassword,
    username: username,
    full_name: full_name,
    custom_id: uuidv4(),
  };
  // check why undefined
  const { error, values } = validateAddUserData(user);
  if (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      },
    );
  }
  let createdUser: any;
  try {
    createdUser = await addUser(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
      },
    );
  }

  await transporter.sendMail({
    from: "Instagram.com",
    to: email,
    subject: "Welcome to Instagram ✔",
    text: "You are now one step away from becoming a member of our community here at Instagram",
    html: `<b>To start your journey, please confirm the activation of your account</b> <a href=https://localhost:3000/activate/${createdUser.custom_id}>`,
  });
  // FE widok activate/?id=xxxx + useeffect robi post /api/activate_user
  // BE endpoint /api/activate_user {"id":xxxx}, be wyszkuje usera z tym id i zmienia mu na active

  return NextResponse.json({ message: "success" });
}
