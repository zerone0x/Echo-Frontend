import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/_utils/auth";

export async function middleware(request: NextRequest) {
  console.log(request);
  let token = request.cookies.get("token")?.value;
  console.log("Token from cookie:", token);

  if (token) {
    if (token.startsWith("s:")) {
      token = token.slice(2);
    }
    token = token.split(".").slice(0, 3).join(".");
  }

  const verifiedToken =
    token &&
    (await verifyJwtToken(token).catch((err) => {
      console.log(err);
    }));
  console.log(verifiedToken);
  if (
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/signup" &&
    !verifiedToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (verifiedToken) {
    const response = NextResponse.next();
    response.headers.set("x-verified-token", JSON.stringify(verifiedToken));
    return response;
  }

  return NextResponse.next();
  // if(verifiedToken){
  //   setAuthData(verifiedToken);
  // }

  // if (request.nextUrl.pathname.startsWith("/b")) {
  // }
}

// export const config = {
//   matcher: ['/home'],
// };
