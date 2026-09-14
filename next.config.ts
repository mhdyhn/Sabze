import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/Sabze",
  assetPrefix: "/Sabze/",
};

export default nextConfig;
