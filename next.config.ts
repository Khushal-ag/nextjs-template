import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // ppr: true,
    reactCompiler: isProd,
  },
};

export default nextConfig;
