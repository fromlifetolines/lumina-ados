import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // REMOVE basePath and assetPrefix entirely
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Vercel does NOT need output: 'export'. REMOVE IT to enable API Routes.
};

export default nextConfig;
