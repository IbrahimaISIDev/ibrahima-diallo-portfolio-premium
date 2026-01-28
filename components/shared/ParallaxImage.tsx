"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    title: string;
}

export default function ParallaxImage({ src, alt, className = "", title }: ParallaxImageProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={ref}
            className={`relative h-full w-full overflow-hidden ${className}`}
            style={{
                viewTransitionName: `project-image-${src.split('/').pop()?.split('.')[0]}`
            } as any}
        >
            <motion.div style={{ y }} className="relative h-[120%] w-full -top-[10%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <span className="font-display text-2xl font-bold text-white/40 select-none">
                        {title}
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
