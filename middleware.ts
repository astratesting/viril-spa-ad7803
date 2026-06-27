import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "./lib/session";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/members",
  "/events",
  "/parlors",
  "/payment",
  "/admin",
];

const PUBLIC_PREFIXES = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect already-authenticated users away from auth pages is handled by the
  // pages themselves; here we only enforce presence on protected routes.
  if (PUBLIC_PREFIXES.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/members/:path*",
    "/events/:path*",
    "/parlors/:path*",
    "/payment/:path*",
    "/admin/:path*",
    "/dashboard",
    "/members",
    "/events",
    "/parlors",
    "/payment",
    "/admin",
    "/login",
    "/signup",
  ],
};
