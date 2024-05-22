import { activateUser } from "@/app/db/activateUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestData = await request.json();
  if (!requestData) {
    throw new Error("Request data is missing.");
  }
  await activateUser(requestData.custom_id);

  return NextResponse.json({ message: "success" });
}
