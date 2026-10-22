import { renderIcon } from "@/lib/icon";

// Favicon et icônes du manifest, générés au build : /icon/small, /icon/medium, /icon/large
export function generateImageMetadata() {
  return [
    { id: "small", size: { width: 32, height: 32 }, contentType: "image/png" },
    { id: "medium", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "large", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

const sizes: Record<string, number> = { small: 32, medium: 192, large: 512 };

export default async function Icon({ id }: { id: Promise<string | number> }) {
  return renderIcon(sizes[String(await id)] ?? 32);
}
