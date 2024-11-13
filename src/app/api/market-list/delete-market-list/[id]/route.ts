import User from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromHeader } from "@/app/api/get-header-info";

export async function DELETE(
  req: NextRequest,

  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id; // marketlist id
  // const userId = req.headers['x-user-id'] as string | undefined;

  try {
    const userId = getTokenFromHeader(req);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          marketLists: {
            _id: id,
          },
        },
      },
      { new: true }
    );
    // if the user doesn't exist
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Send a success response
    return NextResponse.json(
      { message: "Market list deleted successfully" },
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
    // return NextResponse.json({ error: "Error deleting market list", message: error.message }, { status: 500 });
  }
}
