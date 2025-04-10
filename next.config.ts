import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: [
      'react-xtermjs',
    ]
  }
};

export default nextConfig;
