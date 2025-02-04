import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during the build process
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    const isProduction = process.env.NODE_ENV === 'production';

    return [
      {
        source: '/api/:path*', 
        destination: isProduction
          ? 'https://task-manager-kurq.vercel.app/api/:path*'  // Production API URL
          : 'http://localhost:3000/api/:path*',  // Development API URL
      },
    ];
  },
};

export default nextConfig;
