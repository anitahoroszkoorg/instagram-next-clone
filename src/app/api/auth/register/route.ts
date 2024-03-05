import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { validatAddUserData } from "@/app/schemas/addUserSchema";
import { addUser } from "@/app/db/users";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const { error, values } = validatAddUserData(formData);
    if (error) {
      return new Response(error, { status: 400 });
    }
    const newUser = {
      email: values.email,
      password_hash: await hash(values.password_hash, 10),
      username: values.username,
      full_name: values.full_name,
    };
    await addUser(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
  }
  return new Response(JSON.stringify({ satisfies: true }), { status: 200 });
}
