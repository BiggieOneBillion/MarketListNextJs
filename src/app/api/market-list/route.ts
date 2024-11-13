import connectToDatabase from "@/libs/mongodb";
import User from "@/models/users.model";
import { getTokenFromHeader } from "../get-header-info";
import { NextRequest, NextResponse } from "next/server";

// CREATE MARKET LIST
export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { items } = await req.json();

  try {
    const userId = getTokenFromHeader(req);
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.marketLists.push({ items, userId });
    await user.save();
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
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
    //   { error: "Error creating market list", message: error.message },
    //   { status: 500 }
    // );
  }
}

// GET ALL USERS MARKET LIST
export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const userId = getTokenFromHeader(req);
    const marketLists = await User.findById(userId);

    if (!marketLists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    NextResponse.json(
      {
        message: "Successfully fetched data",
        data: marketLists.marketLists,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
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
    // NextResponse.json(
    //   { error: "Error fetching market lists", message: error.message },
    //   { status: 500 }
    // );
  }
}
