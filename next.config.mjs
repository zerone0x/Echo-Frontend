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
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://echobe.fly.dev/api/v1/:path*'
      },
    ];
  },
  // output: "export", // 如果您不需要静态导出，可以保留注释
};

export default nextConfig;
