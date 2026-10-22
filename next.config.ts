import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Racine explicite : évite que Turbopack la déduise d'un lockfile situé plus haut
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
