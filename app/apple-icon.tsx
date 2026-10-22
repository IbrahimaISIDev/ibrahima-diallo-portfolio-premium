import { renderIcon } from "@/lib/icon";

// Icône d'écran d'accueil iOS
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderIcon(180);
}
