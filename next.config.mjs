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
        // port: '3001', // 如果需要指定端口，可以取消注释
      },
      {
        protocol: "http",
        hostname: "authjs.dev",
      },
    ],
  },
};

export default nextConfig;
