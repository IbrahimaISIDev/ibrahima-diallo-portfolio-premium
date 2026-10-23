import { ImageResponse } from "next/og";

// Gabarit commun des images de partage (Open Graph), généré au build
export const ogSize = { width: 1200, height: 630 };

interface OgImageOptions {
  title: string;
  accent: string;
  details: string;
  footer: string;
}

export function renderOgImage({ title, accent, details, footer }: OgImageOptions) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#09090A",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(227,182,92,0.16), transparent 45%), radial-gradient(circle at 10% 95%, rgba(31,122,77,0.3), transparent 50%)",
        color: "#F5F2EA",
      }}
    >
      <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
        <span>Ibra</span>
        <span style={{ color: "#E3B65C" }}>h</span>
        <span>ima</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontSize: 44, color: "#E3B65C", fontWeight: 600 }}>{accent}</div>
        <div style={{ fontSize: 30, color: "#A1A1AA", maxWidth: 950 }}>{details}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 28,
          color: "#A1A1AA",
        }}
      >
        <span>{footer}</span>
        <div style={{ display: "flex", height: 8, width: 240 }}>
          <div style={{ flex: 1, background: "#1F7A4D" }} />
          <div style={{ flex: 1, background: "#E3B65C" }} />
          <div style={{ flex: 1, background: "#D24B37" }} />
        </div>
      </div>
    </div>,
    ogSize,
  );
}
