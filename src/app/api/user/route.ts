import { getUserDetails } from "@/app/db/users";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
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
};
