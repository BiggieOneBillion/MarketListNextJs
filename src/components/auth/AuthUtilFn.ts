import { jwtDecode } from "jwt-decode";

export async function DecodeToken(token: string): Promise<object> {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error instanceof Error) {
      throw new Error("Token Error", error);
    } else {
      throw new Error("Token Error");
    }
  }
}
