import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/Typography";
import { Linkedin } from "@/components/shared/BrandIcons";
import type { SiteContent } from "@/content";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface TestimonialsProps {
  content: SiteContent;
  dict: Dictionary;
}

export default function Testimonials({ content, dict }: TestimonialsProps) {
  const { home } = dict;

  return (
    <section aria-labelledby="testimonials-title" className="pt-24 sm:pt-32">
      <Reveal>
        <SectionHeader
          id="testimonials-title"
          eyebrow={home.testimonialsEyebrow}
          title={home.testimonialsTitle}
        />
      </Reveal>

      <ul className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {content.testimonials.map((testimonial, index) => (
          <Reveal as="li" className="h-full" key={testimonial.name} index={index % 2}>
            <Card size="md" className="h-full">
              <figure className="flex h-full flex-col gap-6 p-7 sm:p-8">
                <span aria-hidden="true" className="font-display text-5xl leading-[0.5] text-gold">
                  “
                </span>
                <blockquote className="text-[17px] leading-relaxed text-ink-soft">
                  {testimonial.content}
                </blockquote>
                <figcaption className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
                  <span className="flex flex-col gap-0.5">
                    <span className="font-semibold text-ink">{testimonial.name}</span>
                    <span className="text-sm text-ink-muted">
                      {testimonial.role} · {testimonial.company}
                      {testimonial.translated && (
                        <span className="block text-xs italic">{home.translatedFromFrench}</span>
                      )}
                    </span>
                  </span>
                  {testimonial.linkedin && (
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${testimonial.name} — LinkedIn`}
                      className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-line text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      <Linkedin size={16} aria-hidden="true" />
                    </a>
                  )}
                </figcaption>
              </figure>
            </Card>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
