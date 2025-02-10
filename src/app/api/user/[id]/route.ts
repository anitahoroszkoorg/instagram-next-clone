import { editUser, getUserDetailsById } from "@/app/db/users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: "No ID provided" }, { status: 400 });
    }
    const userDetails = await getUserDetailsById(id);
    return NextResponse.json({ message: "ok", userDetails }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: "No ID provided" }, { status: 400 });
    }
    const body = await req.json();
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 },
      );
    }
    await editUser(id, body);
    return NextResponse.json(
      { message: "User information updated succesfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
};
