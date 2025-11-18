import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "./app/_utils/auth";

function getCountryFromHeaders(request: NextRequest): string | null {
  // Cloudflare
  const cfCountry = request.headers.get("cf-ipcountry");
  if (cfCountry) {
    console.log("Country from Cloudflare header:", cfCountry);
    return cfCountry;
  }

  // AWS CloudFront
  const cloudFrontCountry = request.headers.get("cloudfront-viewer-country");
  if (cloudFrontCountry) {
    console.log("Country from CloudFront header:", cloudFrontCountry);
    return cloudFrontCountry;
  }

  // Vercel (alternative header)
  const vercelCountry = request.headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    console.log("Country from Vercel header:", vercelCountry);
    return vercelCountry;
  }

  // Generic country code header
  const countryCode = request.headers.get("x-country-code");
  if (countryCode) {
    console.log("Country from generic header:", countryCode);
    return countryCode;
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

function isLocalIP(ip: string | null): boolean {
  if (!ip) return false;
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "::ffff:127.0.0.1" ||
    ip.startsWith("192.168.") ||
    ip.startsWith("10.") ||
    ip.startsWith("172.16.") ||
    ip.startsWith("172.17.") ||
    ip.startsWith("172.18.") ||
    ip.startsWith("172.19.") ||
    ip.startsWith("172.20.") ||
    ip.startsWith("172.21.") ||
    ip.startsWith("172.22.") ||
    ip.startsWith("172.23.") ||
    ip.startsWith("172.24.") ||
    ip.startsWith("172.25.") ||
    ip.startsWith("172.26.") ||
    ip.startsWith("172.27.") ||
    ip.startsWith("172.28.") ||
    ip.startsWith("172.29.") ||
    ip.startsWith("172.30.") ||
    ip.startsWith("172.31.") ||
    ip === "localhost"
  );
}

function getClientIP(request: NextRequest): string | null {
  // Debug: log all available headers for local development
  const isLocalDev = process.env.NODE_ENV === "development";
  if (isLocalDev) {
    console.log("=== Local Development IP Detection ===");
    console.log("Request URL:", request.url);
    console.log(
      "Request headers:",
      Object.fromEntries(request.headers.entries()),
    );
  }

  // Priority 1: x-forwarded-for (most common, contains original client IP)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0].trim();
    console.log("IP from x-forwarded-for:", ip, isLocalIP(ip) ? "(LOCAL)" : "");
    return ip;
  }

  // Priority 2: x-real-ip (nginx proxy)
  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    console.log(
      "IP from x-real-ip:",
      realIP,
      isLocalIP(realIP) ? "(LOCAL)" : "",
    );
    return realIP;
  }

  // Priority 3: CF-Connecting-IP (Cloudflare)
  const cfConnectingIP = request.headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    console.log(
      "IP from CF-Connecting-IP:",
      cfConnectingIP,
      isLocalIP(cfConnectingIP) ? "(LOCAL)" : "",
    );
    return cfConnectingIP;
  }

  // Priority 4: True-Client-IP (Cloudflare Enterprise, Akamai)
  const trueClientIP = request.headers.get("true-client-ip");
  if (trueClientIP) {
    console.log(
      "IP from True-Client-IP:",
      trueClientIP,
      isLocalIP(trueClientIP) ? "(LOCAL)" : "",
    );
    return trueClientIP;
  }

  // Priority 5: x-client-ip (some proxies)
  const clientIPHeader = request.headers.get("x-client-ip");
  if (clientIPHeader) {
    console.log(
      "IP from x-client-ip:",
      clientIPHeader,
      isLocalIP(clientIPHeader) ? "(LOCAL)" : "",
    );
    return clientIPHeader;
  }

  // Priority 6: x-forwarded (alternative)
  const forwarded = request.headers.get("x-forwarded");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    console.log("IP from x-forwarded:", ip, isLocalIP(ip) ? "(LOCAL)" : "");
    return ip;
  }

  // Priority 7: Try request.ip (Next.js/Vercel) - works in local dev
  if (request.ip) {
    console.log(
      "IP from request.ip:",
      request.ip,
      isLocalIP(request.ip) ? "(LOCAL)" : "",
    );
    return request.ip;
  }

  // Priority 8: x-vercel-forwarded-for (Vercel)
  const vercelIP = request.headers.get("x-vercel-forwarded-for");
  if (vercelIP) {
    const ip = vercelIP.split(",")[0].trim();
    console.log(
      "IP from x-vercel-forwarded-for:",
      ip,
      isLocalIP(ip) ? "(LOCAL)" : "",
    );
    return ip;
  }

  // Priority 9: For local dev, try to extract from URL hostname
  if (isLocalDev) {
    const hostname = request.nextUrl.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      console.log("Local development detected, using hostname:", hostname);
      return "127.0.0.1";
    }
  }

  console.log("Could not determine client IP from headers");
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip IP check for /test to avoid redirect loop
  if (pathname !== "/test") {
    // Test mode: Allow overriding IP/country for local development testing
    const testIP = request.headers.get("x-test-ip");
    const testCountry = request.headers.get("x-test-country");

    let clientIP: string | null = null;
    let country: string | null = null;

    // Use test IP if provided (for local development testing)
    if (testIP) {
      clientIP = testIP;
      console.log("🧪 TEST MODE: Using test IP:", clientIP);
    } else {
      clientIP = getClientIP(request);
    }

    const isLocal = isLocalIP(clientIP);

    // Use test country if provided (for local development testing)
    if (testCountry) {
      country = testCountry;
      console.log("🧪 TEST MODE: Using test country:", country);
    } else {
      // Priority 1: Vercel geo (built-in, fastest)
      const geo = request.geo;
      if (geo?.country) {
        country = geo.country;
        console.log(
          "Country from Vercel geo:",
          country,
          "| Client IP:",
          clientIP,
          isLocal ? "(LOCAL)" : "",
        );
      } else {
        // Priority 2: CDN headers (no API call needed)
        country = getCountryFromHeaders(request);

        // Priority 3: Fallback to IP lookup API (slower)
        // Always try API lookup if no country found, including local IPs
        if (!country && clientIP) {
          country = await getCountryFromIP(clientIP);
          console.log(
            "Country from IP API lookup:",
            country,
            "| Client IP:",
            clientIP,
            isLocal ? "(LOCAL)" : "",
          );
        }
      }
    }

    if (country === "US") {
      console.log(
        "US IP detected, redirecting to /test | Client IP:",
        clientIP,
        testIP ? "(TEST MODE)" : "",
      );
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
