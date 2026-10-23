import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy. Les scripts et styles inline restent autorisés :
// Next.js, next-themes et le JSON-LD en injectent, et une CSP à nonces rendrait
// toutes les pages dynamiques. Toutes les origines externes sont en revanche bloquées.
// En développement, le rechargement à chaud de Next a besoin de 'unsafe-eval'.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  // canvas-confetti (confettis du logo) dessine dans un Web Worker créé depuis une URL blob:
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Racine explicite : évite que Turbopack la déduise d'un lockfile situé plus haut
  turbopack: {
    root: __dirname,
  },
  // AVIF en priorité (plus léger), WebP sinon, selon ce que le navigateur accepte
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // N'annonce pas la technologie du serveur (en-tête X-Powered-By)
  poweredByHeader: false,
  // Français à la racine, anglais sous /en : les URL françaises sont servies par app/[lang]
  // avec lang = "fr". En afterFiles, les fichiers statiques (images, CV, robots.txt…) passent
  // avant ; les routes de métadonnées dynamiques et l'API sont exclues explicitement.
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/fr" },
        {
          source:
            "/:path((?!en(?:/|$)|fr(?:/|$)|api(?:/|$)|_next(?:/|$)|icon(?:/|$)|apple-icon(?:/|$)|opengraph-image(?:/|$)).*)",
          destination: "/fr/:path",
        },
      ],
      fallback: [],
    };
  },
  // /fr/... n'est pas une adresse publique : redirection vers l'URL sans préfixe
  async redirects() {
    return [
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
