import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Basic image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
};

export default nextConfig;