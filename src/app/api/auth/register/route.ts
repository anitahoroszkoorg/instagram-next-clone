import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { addUser } from "@/app/db/users";
import { NewUser } from "@/globals";
import { validateAddUserData } from "@/app/schemas/addUserSchema";
import { PrismaClient } from "@prisma/client";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const prisma = new PrismaClient();

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
  };
  // sprawdz dlaczego undefined
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

  try {
    await addUser(user);
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
    html: "<b>To start your journey, please confirm the activation of your account</b>",
  });

  return NextResponse.json({ message: "success" });
}
