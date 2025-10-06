import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://backend:5005";

    return [
      // API routes
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: "/player/:path*",
        destination: `${backendUrl}/player/:path*`,
      },
    ];
  },
};

export default nextConfig;
