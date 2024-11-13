import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export function getTokenFromHeader(req: NextRequest) {
  // console.log("checked");

  const authHeader = req.headers.get("Authorization") as string;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("UnAuthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    return decoded.id;
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error instanceof Error) {
      throw new Error("Invalid Token", error);
    }
  }
}
