import { activateUser } from "@/app/db/activateUser";
import {
  UserDoesntExistError,
  UserIsAlreadyActiveError,
} from "@/app/db/errors";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestData = await request.json();
  if (!requestData) {
    throw new Error("Request data is missing.");
  }
  try {
    await activateUser(requestData.user_id);
  } catch (error) {
    if (error instanceof UserIsAlreadyActiveError) {
      return NextResponse.json(
        { message: "User already active" },
        { status: 409 },
      );
    } else if (error instanceof UserDoesntExistError) {
      return NextResponse.json(
        { message: "User doesn't exist" },
        { status: 404 },
      );
    } else {
      throw error;
    }
  }

  return NextResponse.json({ message: "success" });
}
