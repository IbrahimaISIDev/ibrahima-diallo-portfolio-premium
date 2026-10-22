import { ImageResponse } from "next/og";
import { personalInfo } from "@/data/personal";
import { siteConfig } from "@/lib/constants";

// Image de partage (LinkedIn, WhatsApp, X…) générée au build
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#111111",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(245,158,11,0.18), transparent 45%), radial-gradient(circle at 10% 95%, rgba(27,94,32,0.35), transparent 50%)",
          color: "#F8FAFC",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700 }}>
          <span>Ibra</span>
          <span style={{ color: "#F59E0B" }}>h</span>
          <span>ima</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>
            {personalInfo.fullName}
          </div>
          <div style={{ fontSize: 44, color: "#F59E0B", fontWeight: 600 }}>
            {personalInfo.title}
          </div>
          <div style={{ fontSize: 30, color: "#94A3B8", maxWidth: 950 }}>
            React · Next.js · NestJS · Flutter · PostgreSQL
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#94A3B8",
          }}
        >
          <span>{personalInfo.location}</span>
          <div style={{ display: "flex", height: 8, width: 240 }}>
            <div style={{ flex: 1, background: "#1B5E20" }} />
            <div style={{ flex: 1, background: "#F59E0B" }} />
            <div style={{ flex: 1, background: "#DC2626" }} />
          </div>
        </div>
      </div>
    ),
    size
  );
}
