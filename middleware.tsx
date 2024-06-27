import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  console.log(request);

  if (pathname === "/") {
    return NextResponse.redirect("/home");
  }

  return NextResponse.next();
}
