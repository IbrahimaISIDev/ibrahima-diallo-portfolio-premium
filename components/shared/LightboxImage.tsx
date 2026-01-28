"use client";

import { useState } from "react";
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
            <div
                className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-background shadow-2xl transition-all hover:border-secondary/30"
                onClick={() => setOpen(true)}
            >
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="rounded-full bg-secondary/80 p-3 text-background shadow-lg backdrop-blur-sm">
                            <span className="text-sm font-bold uppercase tracking-wider">Agrandir</span>
                        </div>
                    </div>
                </div>
            </div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src, title, description: alt }]}
                plugins={[Zoom, Fullscreen]}
                carousel={{ finite: true }}
                styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, .9)" },
                    slide: { padding: "40px" }
                }}
            />
        </>
    );
}
