import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// This function can be marked `async` if using `await` inside
export function authorization(req: NextRequest) {
  //   return NextResponse.redirect(new URL('/home', request.url))
  const token = req.headers.get("Authorization")?.split(" ")[1] as string;

  // If there's no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    jwt.verify(token, SECRET_KEY); // Verify the token
    return NextResponse.next(); // Token is valid, continue with the request
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return NextResponse.redirect(new URL("/", req.url)); // Redirect on invalid token
  }
}
