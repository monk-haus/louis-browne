import type { NextConfig } from "next";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const openNextAdapter = "@opennextjs/cloudflare";

try {
  const adapter = require(openNextAdapter) as {
    initOpenNextCloudflareForDev?: () => void;
  };
  adapter.initOpenNextCloudflareForDev?.();
} catch {
  // Adapter is optional until cloudflare dependencies are installed.
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
