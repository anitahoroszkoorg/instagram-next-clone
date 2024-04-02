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
  try {
    const requestData = await request.json();
    const email = requestData?.email; // Check if email is null
    if (!email) {
      throw new Error("Email is required.");
    }

    const { password, username, full_name } = requestData;
    const checkExistingUser = await prisma.instagram_user.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      },
    });
    if (checkExistingUser) {
      console.log("user already exists");
    } else {
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <yourgmail@gmail.com>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: "<b>Hello world?</b>",
      });
      console.log("Message sent: %s", info.messageId);

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
    }
  } catch (e) {
    console.error("Error:", e);
  }
  return NextResponse.json({ message: "success" });
}
