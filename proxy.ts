import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin guard
    if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Protect account and checkout routes
        if (
          pathname.startsWith("/account") ||
          pathname.startsWith("/checkout") ||
          pathname.startsWith("/admin")
        ) {
          return !!token;
        }
        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/account/:path*", "/checkout/:path*", "/admin/:path*"],
};
