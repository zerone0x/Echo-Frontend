import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/_utils/auth";

function getCountryFromHeaders(request: NextRequest): string | null {
  const headers = [
    "cf-ipcountry",
    "cloudfront-viewer-country",
    "x-vercel-ip-country",
    "x-country-code",
  ];

  for (const header of headers) {
    const country = request.headers.get(header);
    if (country) {
      console.log(`Country from ${header}:`, country);
      return country;
    }
  }
  return null;
}

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
  const ipHeaders = [
    "x-forwarded-for",
    "x-real-ip",
    "cf-connecting-ip",
    "true-client-ip",
    "x-client-ip",
    "x-forwarded",
    "x-vercel-forwarded-for",
  ];

  for (const header of ipHeaders) {
    const value = request.headers.get(header);
    if (value) {
      const ip = value.split(",")[0].trim();
      console.log(`IP from ${header}:`, ip);
      return ip;
    }
  }

  if (request.ip) {
    console.log("IP from request.ip:", request.ip);
    return request.ip;
  }

  const hostname = request.nextUrl.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "127.0.0.1";
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== "/test") {
    const testIP = request.headers.get("x-test-ip");
    const testCountry = request.headers.get("x-test-country");
    const clientIP = testIP || getClientIP(request);
    let country: string | null = testCountry;

    if (!country) {
      country = request.geo?.country || getCountryFromHeaders(request);
      if (!country && clientIP) {
        country = await getCountryFromIP(clientIP);
      }
    }

    if (country === "IN") {
      console.log("India IP detected, redirecting to /test | IP:", clientIP);
      return NextResponse.redirect(new URL("/test", request.url));
    }
  }

  if (pathname === "/user") {
    return NextResponse.redirect(new URL("/user/testuser", request.url));
  }

  let token = request.cookies.get("token")?.value;
  if (token) {
    if (token.startsWith("s:")) token = token.slice(2);
    token = token.split(".").slice(0, 3).join(".");
  }

  const verifiedToken =
    token && (await verifyJwtToken(token).catch((err) => console.log(err)));

  if (verifiedToken) {
    const headers = new Headers(request.headers);
    headers.set("x-user-id", verifiedToken.userId);
    headers.set("x-user-name", verifiedToken.name);
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
