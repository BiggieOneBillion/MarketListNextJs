import User from "@/models/users.model";
import { getTokenFromHeader } from "@/app/api/get-header-info";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,

  { params }: { params: Promise<{ id: string; index: string }> }
) {
  const { id, index } = await params; //  marketListId

  // const userId = req.headers['x-user-id'] as string | undefined;
  try {
    const userId = getTokenFromHeader(req);
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

    //  using splice to delete the item at the specified index
    marketList.items.splice(index, 1);

    // Save the updated user document with the updated market list
    await user.save();

    // Send the updated market list as the response
    return NextResponse.json(
      { message: "Successfully deleted item", data: marketList },
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
    //   { error: "Error updating market list", message: error.message },
    //   { status: 500 }
    // );
  }
}
