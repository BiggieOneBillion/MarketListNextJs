// import type { NextRequest } from "next/server";
// import { checkAuthToken } from "@/libs/check-auth-token";
// import { authorization } from "@/libs/check-login-token";
// import { validateFn } from "@/libs/validation-config";

// // This function can be marked `async` if using `await` inside
// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   //------------ AUTHENTICATION AND AUTHORISATION CHECKS STARTS-------------//
//   // Apply auth check only for certain API routes
//   // so they cannot be access except if there is an access token
//   // if (
//   //   pathname.includes("/api/market-list") ||
//   //   pathname.includes("/api/user")
//   // ) {
//     const authCheck = checkAuthToken(req);
//     if (authCheck) return authCheck;
//   // }

//   // Apply auth check to stop the user from accessing the dashboard with signing in
//   // if (pathname.startsWith("/dashboard")) {
//   //   const authCheck = authorization(req);
//   //   if (authCheck) return authCheck;
//   // }

//   //------------ AUTHENTICATION AND AUTHORISATION CHECKS END-------------//

//   //------------ VALIDATION CHECKS STARTS-------------//

//   // This function takes the pathname and req object
//   // First it checks if the pathname matches any of the pathname in the config object
//   // If it does, it validates the req.body or req.json() against the zod schema
//   // If the validation fails, it returns the validation response
//   // If the validation is successful, it continues to the next middleware
//   validateFn(pathname, req)

//   //------------ VALIDATION CHECKS END-------------//
// }

import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Log the path the user is navigating to
  // console.log('h1iiiiiiiiiiiiiiiiiiiiiiiiiiii-------12');

  // console.log('Navigating to:', req.nextUrl.pathname);

  // Allow the request to continue
  return NextResponse.next();
}

// Run the middleware for all routes (or configure a custom matcher as needed)
export const config = {
  matcher: "/:path*", // Applies to all routes
};
