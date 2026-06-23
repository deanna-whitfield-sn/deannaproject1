import type { NextConfig } from "next";

// On GitHub Pages (project site) the app is served under /<repo>, so we set a
// basePath. Locally `npm run dev` leaves it empty. The CI workflow sets
// NEXT_PUBLIC_BASE_PATH=/deannaproject1 at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  // GitHub Pages has no server: use a custom loader that just prefixes
  // basePath instead of the default optimizing loader.
  images: { loader: "custom", loaderFile: "./image-loader.ts" },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
};

export default nextConfig;
