import User from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/libs/mongodb";
import { getTokenFromHeader } from "../../get-header-info";

export async function GET(req: NextRequest) {
  // // console.log(req.headers);

  // const userId = req.headers["x-user-id"] as  unknown as string | undefined;
  //  // console.log('get my list');
  //  // console.log("USER-ID",userId);

  try {
    await connectToDatabase();

    const userId = getTokenFromHeader(req);

    const marketLists = await User.findById(userId);
    //  // console.log('get my list');

    if (!marketLists) {
      // // console.log('sweet spot');

      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    // // console.log('get my list');

    return NextResponse.json(
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
    // return NextResponse.json(
    //   { error: "Error fetching market lists", message: error.message },
    //   { status: 500 }
    // );
  }
}
