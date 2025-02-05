import { getUsers } from "@/app/db/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const users = await getUsers();
    return NextResponse.json({ message: "ok", users }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user details:", error);

    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
};
