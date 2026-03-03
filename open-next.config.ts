import { createRequire } from "node:module";

type CloudflareAdapter = {
  defineCloudflareConfig?: () => unknown;
};

const require = createRequire(import.meta.url);
const openNextAdapter = "@opennextjs/cloudflare";
let config: unknown = {};

try {
  const adapter = require(openNextAdapter) as CloudflareAdapter;

  if (adapter.defineCloudflareConfig) {
    config = adapter.defineCloudflareConfig();
  }
} catch {
  // Adapter is optional until cloudflare dependencies are installed.
}

export default config;
