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
  // Libellé du bouton d'agrandissement, dans la langue de la page
  zoomLabel: string;
}

export default function LightboxImage({ src, alt, title, zoomLabel }: LightboxImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ViewTransition name={projectImageTransitionName(src)} share="morph" default="none">
        {/* Vrai bouton : agrandissement accessible au clavier et annoncé aux lecteurs d'écran */}
        <button
          type="button"
          aria-label={`${zoomLabel} : ${title}`}
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[28px] border border-line bg-card outline-none transition-colors hover:border-line-strong focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          onClick={() => setOpen(true)}
        >
          <span className="relative block aspect-video w-full overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              // Largeur réelle : pleine largeur sur mobile, conteneur de 1240 px au-delà
              sizes="(min-width: 1240px) 1176px, 100vw"
              priority
            />
            <span className="absolute right-4 bottom-4 rounded-full border border-white/10 bg-[#09090a]/75 px-4 py-2 text-sm font-medium text-[#f5f2ea] opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {zoomLabel}
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
