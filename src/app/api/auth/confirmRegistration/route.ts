import { activateUser } from "@/app/db/activateUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestData = await request.json();
  console.log(requestData);
  if (!requestData) {
    throw new Error("Request data is missing.");
  }
  //validate
  activateUser(requestData);

  return NextResponse.json({ message: "success" });
}
