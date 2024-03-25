import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { addUser } from "@/app/db/users";
import { NewUser } from "@/globals";
import { validateAddUserData } from "@/app/schemas/addUserSchema";
import { PrismaClient } from "@prisma/client";
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
  secure: true,
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, username, full_name } = await request.json();
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
      return NextResponse.redirect("/pages/login");
    } else {
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
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
