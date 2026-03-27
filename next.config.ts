import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactCompiler: true,

  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: isProd ? "/landing-altaidom" : "",
  assetPrefix: isProd ? "/landing-altaidom/" : "",
};

export default nextConfig;