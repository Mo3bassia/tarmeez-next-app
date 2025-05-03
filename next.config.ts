import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["tarmeezacademy.com", "dummyimage.com", "localhost"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
