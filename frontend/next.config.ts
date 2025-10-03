import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${
          process.env.API_URL || "http://backend:5005"
        }/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
