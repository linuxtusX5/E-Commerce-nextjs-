import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/account", "/checkout"];
const ADMIN_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;
  const isAdmin = token?.role === "ADMIN";

  if (isLoggedIn && AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) {
      const url = new URL("/login", req.nextUrl);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn)
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    if (!isAdmin) return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/auth).*)",
  ],
};
