import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Since all Middleware Requires Absolute URLs
const BASE_URL = "http://localhost:3000";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${BASE_URL}/login`);
  }
}
