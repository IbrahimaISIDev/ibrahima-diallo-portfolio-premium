import { ImageResponse } from "next/og";

// Monogramme du site : « I » clair et « h » ambre, comme dans le logo « Ibra·h·ima ».
// Dessiné en tracés SVG épais plutôt qu'en texte : la police par défaut de next/og
// n'a pas de graisse grasse, et le « I » se confondrait avec un « l ».
export function renderIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          borderRadius: size * 0.22,
        }}
      >
        <svg width={size} height={size} viewBox="0 0 100 100">
          {/* « I » avec empattements haut et bas */}
          <path d="M33 26 V74 M21 28 H45 M21 72 H45" stroke="#F8FAFC" strokeWidth="11" fill="none" />
          {/* « h » : fût et arche */}
          <path d="M59 22 V76 M59 54 Q59 43 70 43 Q81 43 81 55 V76" stroke="#F59E0B" strokeWidth="11" fill="none" />
        </svg>
      </div>
    ),
    { width: size, height: size }
  );
}
