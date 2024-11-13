import connectToDatabase from "@/libs/mongodb";
import User from "@/models/users.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    // console.log("routed");

    const { email, password } = await req.json();

    const user = await User.findOne({ email: email });
    //  if user does not exist and password does not match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: unknown) {
    // Check if the error is an instance of Error before accessing error.message
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
