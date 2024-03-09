import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { addUser } from "@/app/db/users";

export async function POST(request: Request) {
  try {
    const { email, password, username, full_name } = await request.json();
    console.log({ email, password, username, full_name });
    const hashedPassword = await hash(password, 10);
    const user = {
      email: email,
      password_hash: hashedPassword,
      username: username,
      full_name: full_name,
    };
    addUser(user);
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
