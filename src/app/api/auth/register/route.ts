import { hash } from "bcrypt";
import { validateAddUserData } from "@/app/schemas/addUserSchema";
import { addUser } from "@/app/db/users";

interface NewUser {
  email: string;
  password_hash: string;
  username: string;
  full_name: string;
}

export async function POST(request: Request) {
  console.log(request.body);
  // try {
  //   const { error, values } = validateAddUserData();
  //   if (error) {
  //     return new Response(error, { status: 400 });
  //   }
  //   await addUser(newUser);
  //   return new Response(JSON.stringify(values), { status: 200 });
  // } catch (err) {
  //   console.error("Error creating user:", err);
  return new Response(JSON.stringify({ status: 400 }));
  // }
}
