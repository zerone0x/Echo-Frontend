/** @type {import('next').NextConfig} */
export default {
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
        // port: '3001',
      },
      {
        protocol: "http",
        hostname: "authjs.dev",
      },
    ],
  },
  // async rewrites() {
  // 	return [
  // 		{
  // 			source: '/api/v1/:path*',
  //     destination: 'https://echobe.fly.dev/api/v1/:path*'
  // 		},
  // 	]
  // },
  // output: "export",
};

// export async function rewrites() {
//   return [
//     {
//       source: '/api/v1/:path*',
//       destination: 'https://echobe.fly.dev/api/v1/:path*'
//     },
//   ]
// }

// module.exports = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:3001/api/:path*',
//       },
//     ];
//   },
// };
