"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionTitle from "@/components/shared/SectionTitle";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };
  const next = () => {
    setDirection(1);
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const testimonial = testimonials[current];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-surface sm:bg-transparent sm:bg-gradient-to-b sm:from-surface sm:to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          subtitle="Témoignages"
          title="Ce qu'ils disent"
          description="Les retours de mes clients et collaborateurs sur notre travail ensemble."
        />

        <div className="mx-auto max-w-3xl">
          {/* Testimonial card */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-8 sm:p-12 shadow-xl shadow-secondary/5">
            {/* Quote icon */}
            <motion.div
              className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-background z-20"
              initial={{ rotate: -20, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
            >
              <Quote size={20} />
            </motion.div>

            {/* Content Area */}
            <div className="relative min-h-[250px] sm:min-h-[200px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="w-full"
                >
                  <blockquote className="mb-8 text-lg leading-relaxed text-muted sm:text-xl italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar placeholder */}
                      <motion.div
                        className={cn(
                          "flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
                          testimonial.avatarColor || "from-primary to-secondary"
                        )}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className="font-display text-lg font-bold text-white">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </motion.div>
                      <div>
                        <p className="font-display font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-2">
                      <motion.button
                        onClick={prev}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-secondary hover:text-secondary cursor-pointer"
                        aria-label="Témoignage précédent"
                      >
                        <ChevronLeft size={18} />
                      </motion.button>
                      <motion.button
                        onClick={next}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-secondary hover:text-secondary cursor-pointer"
                        aria-label="Témoignage suivant"
                      >
                        <ChevronRight size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                className="relative h-2 cursor-pointer focus:outline-none"
                aria-label={`Témoignage ${index + 1}`}
              >
                <div className="h-full w-2 rounded-full bg-border" />
                {current === index && (
                  <motion.div
                    layoutId="testimonialDot"
                    className="absolute inset-0 w-8 bg-secondary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
