import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const loggedIn = Boolean(request.auth);

  if (loggedIn && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!loggedIn && pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
