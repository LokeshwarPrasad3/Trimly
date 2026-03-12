import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { AUTH_COOKIE_NAME } from "@/server/auth/constants";

const protectedPrefixes = ["/dashboard"];
const authPages = ["/sign-in", "/sign-up", "/guest-upgrade"];

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const isAuthPage = authPages.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (isAuthPage && sessionToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/guest-upgrade"],
};
