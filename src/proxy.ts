import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "@/lib/auth";

export default async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  let loggedIn = Boolean(token);
  let via = token ? "token" : "none";
  if (!loggedIn) {
    const session = await auth();
    loggedIn = Boolean(session?.user);
    via = loggedIn ? "session" : "none";
  }
  const { pathname } = request.nextUrl;

  if (loggedIn && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!loggedIn && pathname.startsWith("/admin") && pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-debug-auth", via);
  response.headers.set("x-debug-secret", String(Boolean(process.env.AUTH_SECRET)));
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};