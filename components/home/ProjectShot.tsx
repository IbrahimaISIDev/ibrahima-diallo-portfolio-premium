"use client";

import Image from "next/image";
import { ViewTransition } from "react";
import { cn, projectImageTransitionName } from "@/lib/utils";

interface ProjectShotProps {
  src: string;
  alt: string;
  sizes: string;
  // Format du cadre, ex. "aspect-video"
  className?: string;
}

// Capture d'un projet dans une carte. Même nom de transition que l'image de
// l'étude de cas : l'image glisse de la carte vers la page du projet.
export default function ProjectShot({ src, alt, sizes, className }: ProjectShotProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-line", className)}>
      <ViewTransition name={projectImageTransitionName(src)} share="morph" default="none">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </ViewTransition>
    </div>
  );
}
