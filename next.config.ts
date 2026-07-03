import type { NextConfig } from "next";

/**
 * Deployment targets:
 *  - Default (Vercel / Node): full server, image optimization, no base path.
 *  - Static export (Hostinger file hosting): set BUILD_TARGET=static and
 *    NEXT_PUBLIC_BASE_PATH=/demo. Produces a plain HTML/CSS/JS `out/` folder
 *    that can be uploaded to any static host under a sub-path.
 */
const isStaticExport = process.env.BUILD_TARGET === "static";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Emit a fully static site when building for file hosting.
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),

  // Serve the site from a sub-path (e.g. /demo) so asset URLs resolve correctly.
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  images: {
    // Static hosts have no image optimizer, so pass images through untouched.
    unoptimized: isStaticExport,
    remotePatterns: [
      // Sample/placeholder product imagery (used by the mock commerce provider).
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // Shopify CDN — used automatically once the Shopify provider is enabled.
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
};

export default nextConfig;
