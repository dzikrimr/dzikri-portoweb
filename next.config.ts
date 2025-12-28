import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '35chue4gfs.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;