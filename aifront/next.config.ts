import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    const apiBaseUrl = process.env.BACKEND_API_URL;
    if (!apiBaseUrl) {
      console.error('BACKEND_API_URL is not defined');
      return [];
    }
    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*/` // Proxy to Node Backend
      },
      {
        source: '/auth/:path*',
        destination: `${apiBaseUrl}/auth/:path*/` // Proxy to Node Backend
      }
    ];
  },
};

export default nextConfig;
