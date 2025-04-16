import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/public/images/:path*',
        destination: '/images/:path*',
      },
    ];
  },
};

export default nextConfig;
