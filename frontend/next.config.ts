import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  async rewrites() {
    // Keep the browser on one origin during local development while Express runs on :5000.
    if (process.env.VERCEL) return [];
    return [{ source: "/api/:path*", destination: "http://localhost:5000/api/:path*" }];
  }
};

export default nextConfig;
