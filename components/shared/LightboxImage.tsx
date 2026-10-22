"use client";

import { useState, ViewTransition } from "react";
import { projectImageTransitionName } from "@/lib/utils";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom, Fullscreen } from "yet-another-react-lightbox/plugins";

interface LightboxImageProps {
  src: string;
  alt: string;
  title: string;
}

export default function LightboxImage({ src, alt, title }: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ViewTransition name={projectImageTransitionName(src)} share="morph" default="none">
        {/* Vrai bouton : agrandissement accessible au clavier et annoncé aux lecteurs d'écran */}
        <button
          type="button"
          aria-label={`Agrandir l'image : ${title}`}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all hover:border-secondary/30 outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          onClick={() => setOpen(true)}
        >
          <span className="relative block aspect-video w-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              // Largeur réelle : pleine largeur sur mobile, conteneur max-w-5xl (~960 px) au-delà
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
            />
            <span className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="rounded-full bg-secondary/80 p-3 text-background shadow-lg backdrop-blur-sm">
                <span className="text-sm font-bold uppercase tracking-wider">Agrandir</span>
              </span>
            </span>
          </span>
        </button>
      </ViewTransition>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, title, description: alt }]}
        plugins={[Zoom, Fullscreen]}
        carousel={{ finite: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .9)" },
          slide: { padding: "40px" },
        }}
      />
    </>
  );
}
