import { editUser, getUserDetails } from "@/app/db/users";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ message: "No email" }, { status: 400 });
    }

    const userDetails = await getUserDetails(email);
    return NextResponse.json({ message: "ok", userDetails }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user details:", error);

    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ message: "No ID provided" }, { status: 400 });
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 },
      );
    }

    const updatedUser = await editUser(id, updateData);

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found or update failed" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "ok", user: updatedUser },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error updating user:", error);

    return new NextResponse(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
