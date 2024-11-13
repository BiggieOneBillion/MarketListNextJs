import connectToDatabase from "@/libs/mongodb";
import { NextApiRequest } from "next";
import User from "@/models/users.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  await connectToDatabase();

  try {
    const user = await User.findById({
      _id: req.headers["x-user-id"] as string | undefined,
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(
      { message: "Successfully gotten user data", user },
      { status: 200 }
    );
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error", message: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}

export async function PUT(req: NextApiRequest) {
  const { name, password } = (await req.body()) as {
    name: string;
    password: string;
  };

  try {
    const updateData: { name: string; password?: string } = { name };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.headers["x-user-id"] as string | undefined,
      {
        ...updateData,
      }
    ).exec();

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // return NextResponse.json(
    //   { error: "Internal server error", message: error.message },
    //   { status: 500 }
    // );
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
  }
}
