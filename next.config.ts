import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      { // Added to cover direct github.com links if any, though raw files are usually from raw.githubusercontent.com
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
