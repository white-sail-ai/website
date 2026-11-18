import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files in out/, served by GitHub Pages.
  output: "export",
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
