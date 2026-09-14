import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/Sabze",
  assetPrefix: "/Sabze/",

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;
