import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  async rewrites() {
    // Use API_URL for server-side rewrites
    // In Docker: http://backend:5005 (internal network)
    // In local dev: http://localhost:5005
    const backendUrl = process.env.API_URL || "http://localhost:5005";

    console.log("[Next.js] Backend URL for server-side rewrites:", backendUrl);

    return [
      // API routes - these are server-side proxies
      // Browser requests /api/* → Next.js server → backend
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
