"use client";

import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { defaultLocale, isLocale, localePath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

// not-found ne reçoit pas les paramètres de la route : la langue est lue dans le chemin
// (sous une URL réécrite, usePathname() renvoie le chemin interne /fr/… ou /en/…)
export default function NotFound() {
  const segment = usePathname().split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const { notFound, common } = getDictionary(locale);

  return (
    <main id="main">
      <Container className="flex min-h-[60vh] flex-col items-start justify-center gap-6 pt-16">
        <p
          aria-hidden="true"
          className="rise font-display text-[clamp(6rem,22vw,14rem)] leading-[0.8] font-bold tracking-[-0.06em] text-gold"
        >
          404
        </p>
        <h1 className="font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-5xl">
          {notFound.title}
        </h1>
        <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">
          {notFound.text}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button href={localePath(locale, "/")} size="lg">
            <ArrowLeft size={16} aria-hidden="true" />
            {notFound.back}
          </Button>
          <Button href={localePath(locale, "/projects")} variant="outline" size="lg">
            {common.allProjects}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </main>
  );
}
