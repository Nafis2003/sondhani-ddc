import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@react-pdf/renderer"],
  turbopack: {},

  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    (config.resolve.alias as Record<string, unknown>).canvas = false;
    (config.resolve.alias as Record<string, unknown>).encoding = false;
    return config;
  },
};

export default nextConfig;
