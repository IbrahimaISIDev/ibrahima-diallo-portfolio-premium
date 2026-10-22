import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Nom de view transition partagé par l'image d'un projet (carte du portfolio)
// et sa couverture dans l'étude de cas : le navigateur anime l'une vers l'autre
export function projectImageTransitionName(src: string) {
  return `project-image-${src.split("/").pop()?.split(".")[0]}`;
}
