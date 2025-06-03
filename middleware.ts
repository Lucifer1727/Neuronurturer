import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup" || path === "/";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // If the user is authenticated and tries to access a public path, redirect them to profile
    console.log("User is authenticated, redirecting to profile");
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // If the user is not authenticated and tries to access a protected path, redirect them to login
    console.log("User is not authenticated, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If none of the above conditions match, let the request proceed
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Matches all routes except static assets
};
