import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const imageHostnames = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
  .split(",")
  .map((host) => host.trim())
  .filter(Boolean);

/** Sensible CSP for a static marketing/template site without breaking Next.js. */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Avoid forcing HTTPS upgrade during local http:// development.
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next.js 16.4 recommends Cache Components for new apps (create-next-app default).
  cacheComponents: true,
  partialPrefetching: true,
  // Always-on React Compiler; Rust path via Turbopack when available.
  reactCompiler: true,
  experimental: {
    agentUpgrade: "security",
    turbopackRustReactCompiler: true,
  },
  // Keep remote images opt-in. Add comma-separated hosts via NEXT_PUBLIC_IMAGE_HOSTS.
  ...(imageHostnames.length > 0 && {
    images: {
      remotePatterns: imageHostnames.map((hostname) => ({
        protocol: "https",
        hostname,
      })),
    },
  }),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
