import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic image optimization
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Enable compression
  compress: true,
};

export default nextConfig;