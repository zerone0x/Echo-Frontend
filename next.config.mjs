/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "authjs.dev",
      },
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NEXT_PUBLIC_ENV === "PRD"
            ? "https://echobe.fly.dev/api/:path*"
            : "http://localhost:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
