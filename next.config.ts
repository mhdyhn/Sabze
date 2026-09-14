import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/Sabze",

  assetPrefix: "/Sabze/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
