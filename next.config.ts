import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Crucial for GitHub Pages
  images: {
    unoptimized: true, // Crucial for GitHub Pages
  },
  basePath: process.env.NODE_ENV === 'production' ? '/lumina-ados' : '',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // eslint key removed as it is no longer supported in next.config.ts
};

export default nextConfig;
