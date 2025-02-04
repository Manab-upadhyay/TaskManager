import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during the build process
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match any path starting with /api
        destination: 'https://task-manager-kurq.vercel.app/api/:path*', // Proxy it to your external API
      },
    ];
  },
};

export default nextConfig;