import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { auth } from "@/lib/auth";

async function resolveToken(request: NextRequest) {
  const variants = [
    { secureCookie: true },
    { secureCookie: true, salt: "__Secure-authjs.session-token" },
    { salt: "authjs.session-token" },
  ];
  for (const variant of variants) {
    try {
      const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET,
        ...variant,
      });
      if (token) return { token, via: "token" };
    } catch {
      // coba varian berikutnya
    }
  }
  const session = await auth();
  if (session?.user) return { token: session, via: "session" };
  return { token: null, via: "none" };
}

export default async function proxy(request: NextRequest) {
  const { token, via } = await resolveToken(request);
  const loggedIn = Boolean(token);
  const { pathname } = request.nextUrl;

  if (loggedIn && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!loggedIn && pathname.startsWith("/admin") && pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-debug-auth", via);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};