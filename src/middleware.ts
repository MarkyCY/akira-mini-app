// middleware.ts
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default async function middleware(req: any) {
    const session = await auth();

  if (!session) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|api|_next/static|_next/image|favicon.ico).*)"],
};
