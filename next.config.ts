import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["tarmeezacademy.com", "dummyimage.com", "localhost"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
