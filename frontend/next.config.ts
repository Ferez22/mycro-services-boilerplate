import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    // Use API_URL for server-side rewrites (works in Docker)
    // Falls back to localhost for local development
    const backendUrl =
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5005";

    console.log("Backend URL for rewrites:", backendUrl);

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
