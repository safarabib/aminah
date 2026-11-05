import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ESLint er strict warning gulo build er shomoy ignore korbe
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript er strict type checking gulo build er shomoy ignore korbe
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;