// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "lh3.googleusercontent.com",
//       "example.com",
//       "i.pinimg.com",
//       "m.media-amazon.com",
//     ],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "in.pinterest.com",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "in.pinterest.com",
      },
    ],
  },
};

export default nextConfig;
