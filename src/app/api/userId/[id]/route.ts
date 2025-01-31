import { getUserDetailsById } from "@/app/db/users";
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
