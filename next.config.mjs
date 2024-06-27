/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        // port: '3001',
      },
      {
        protocol: "http",
        hostname: "authjs.dev",
      },
    ],
  },
  // output: "export",
};
