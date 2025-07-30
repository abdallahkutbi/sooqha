import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add a rule to handle markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;
