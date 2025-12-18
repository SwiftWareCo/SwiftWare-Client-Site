import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
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
