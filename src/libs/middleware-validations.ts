// lib/checkAuthToken.ts
import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";

export async function validate(req: NextRequest, schema: ZodSchema) {
  try {
    const body = await req.json();
    // Parse the body with the provided schema
    schema.parse(body);

    return NextResponse.next();
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Bad Request", details: error.message },
        { status: 403 }
      );
    } else {
      return NextResponse.json({ error: "Bad Request" }, { status: 403 });
    }
  }
}
