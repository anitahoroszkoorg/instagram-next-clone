import { getUsers } from "@/app/db/users";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("search") || "";
  try {
    if (searchQuery) {
      const users = await getUsers(searchQuery);
      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
