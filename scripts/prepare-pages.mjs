import { readdirSync, copyFileSync } from "fs";
import { join } from "path";

const bundleDir = ".open-next/bundle";
const assetsDir = ".open-next/assets";

for (const file of readdirSync(bundleDir)) {
  if (file.includes(".wasm") || file === "worker.js") {
    const src = join(bundleDir, file);
    const dest = join(assetsDir, file === "worker.js" ? "_worker.js" : file);
    console.log(`  ${src} -> ${dest}`);
    copyFileSync(src, dest);
  }
}
console.log("Pages bundle prepared.");
