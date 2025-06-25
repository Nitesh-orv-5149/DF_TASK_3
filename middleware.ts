// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add protected paths and allowed roles
const protectedRoutes = [
  { path: "/admin", role: "admin" },
  { path: "/student", role: "student" },
  // add more as needed
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Token:", token); // Debugging line to check the token

  const { pathname } = req.nextUrl;

  for (const route of protectedRoutes) {
    if (pathname.startsWith(route.path)) {
      if (!token || token.role !== route.role) {
        const loginUrl = new URL("/unauthorized", req.url); // redirect location
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
      "/admin/:path*",  // protects /admin and anything under it
      "/student/:path*", // protects /student and its children
    ],
  };
