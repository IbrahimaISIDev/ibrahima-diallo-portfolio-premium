"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface InfiniteMarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
}

export default function InfiniteMarquee({
  items,
  speed = 30,
  direction = "left",
}: InfiniteMarqueeProps) {
  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items, ...items];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    // Animation CSS : en pause hors écran (data-paused) et coupée par « réduire les animations »
    <div ref={ref} data-paused={!inView} className="relative flex w-full overflow-hidden py-10">
      {/* Gradient Mask for edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="mx-6 flex items-center gap-3 rounded-2xl border border-border bg-surface/50 px-6 py-3 shadow-sm backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 group"
          >
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-display text-sm font-bold uppercase tracking-widest text-muted group-hover:text-foreground">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
