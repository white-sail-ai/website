import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Self-contained server bundle for the Docker image (see Dockerfile).
  output: "standalone",
  async redirects() {
    // One canonical address: www.white-sail.ai goes to white-sail.ai.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.white-sail.ai" }],
        destination: "https://white-sail.ai/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
