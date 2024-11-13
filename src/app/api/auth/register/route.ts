import connectToDatabase from "@/libs/mongodb";
import User from "@/models/users.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  try {
    // connect to db
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });

    await newUser.save();

    return NextResponse.json({ user: newUser }, { status: 201 });
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
  }
}
