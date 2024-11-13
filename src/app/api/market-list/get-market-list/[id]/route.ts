import connectToDatabase from "@/libs/mongodb";
// import type { NextApiRequest } from "next";
import User from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request | NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = req.headers.get("x-user-id") as string | undefined;
  try {
    await connectToDatabase();
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find the specific market list by marketListId
    const marketList = user.marketLists.id(id);

    if (!marketList) {
      return NextResponse.json(
        { message: "Market list not found" },
        { status: 404 }
      );
    }

    // Send the market list as the response
    return NextResponse.json(
      { message: "Successfully fetched list", data: marketList },
      { status: 200 }
    );
  } catch (error:unknown) {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     if (error instanceof Error) {
      return NextResponse.json(
        { error: "Server error", message: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Server error", message: "An unknown error occurred" },
        { status: 500 }
      );
    }
    // return NextResponse.json(
    //   { error: "Error fetching market list", message: error.message },
    //   { status: 500 }
    // );
  }
}
