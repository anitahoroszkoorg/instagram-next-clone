import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { addUser } from "@/app/db/users";
import { NewUser } from "@/globals";
import { validateAddUserData } from "@/app/schemas/addUserSchema";

export async function POST(request: Request) {
  try {
    const { email, password, username, full_name } = await request.json();
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
