import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/_utils/auth";

export async function middleware(request: NextRequest) {
  // console.log("request.cookies", request);
  let token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  // console.log("token", token);
  if (pathname === "/user") {
    return NextResponse.redirect(new URL("/user/testuser", request.url));
  }

  if (token) {
    if (token.startsWith("s:")) {
      token = token.slice(2);
    }
    token = token.split(".").slice(0, 3).join(".");
  }
  // console.log("after token", token);

  const verifiedToken =
    token &&
    (await verifyJwtToken(token).catch((err) => {
      console.log(err);
    }));
  console.log("verifiedToken", verifiedToken);

  if (verifiedToken) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", verifiedToken.userId);
    requestHeaders.set("x-user-name", verifiedToken.name);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    return response;
  }
  // if (verifiedToken === undefined && pathname !== "/") {
  //   return NextResponse.redirect(new URL("/", request.url), { status: 303 });
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
