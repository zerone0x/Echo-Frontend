import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }
  if (request.nextUrl.pathname.startsWith("/b")) {
    console.log("Middleware B is running");
    return NextResponse.redirect(new URL("/b-new", request.url));
  }
}

// export const config = {
//   matcher: ['/home'],
// };
