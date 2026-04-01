import type { NextConfig } from "next";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const openNextAdapter = "@opennextjs/cloudflare";

try {
  const adapter = require(openNextAdapter) as {
    initOpenNextCloudflareForDev?: () => void;
  };
  adapter.initOpenNextCloudflareForDev?.();
} catch {}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
