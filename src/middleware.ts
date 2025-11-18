import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/_utils/auth";

async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country/`, {
      headers: {
        "User-Agent": "Next.js-Middleware",
      },
    });
    if (response.ok) {
      const country = await response.text();
      return country.trim();
    }
  } catch (error) {
    console.log("Failed to fetch country from IP:", error);
  }
  return null;
}

function getClientIP(request: NextRequest): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip IP check for /test to avoid redirect loop
  if (pathname !== "/test") {
    // Check geo location (Vercel provides this)
    const geo = request.geo;
    let country: string | null = null;

    if (geo?.country) {
      country = geo.country;
      console.log("Geo country from Vercel:", country);
    } else {
      // Fallback: get IP and query location
      const clientIP = getClientIP(request);
      console.log("Client IP:", clientIP);

      if (clientIP) {
        country = await getCountryFromIP(clientIP);
        console.log("Country from IP lookup:", country);
      }
    }

    if (country === "US") {
      console.log("US IP detected, redirecting to /test");
      return NextResponse.redirect(new URL("/test", request.url));
    }
  }

  // console.log("request.cookies", request);
  let token = request.cookies.get("token")?.value;
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
