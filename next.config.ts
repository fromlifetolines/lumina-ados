import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export' removed for Vercel (enables API routes)
  // images.unoptimized removed (Vercel optimization enabled)
  // basePath removed (Root domain deployment)
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
