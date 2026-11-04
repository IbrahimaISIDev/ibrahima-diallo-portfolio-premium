"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";

// Heure locale de Dakar (GMT toute l'année), mise à jour chaque minute.
// Rendue côté client uniquement : l'heure du build n'aurait aucun sens.
export default function DakarTime({ locale, suffix }: { locale: Locale; suffix: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Africa/Dakar",
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = setInterval(update, 15_000);
    return () => clearInterval(timer);
  }, [locale]);

  return (
    // Couleur fixe : la pastille qui l'affiche reste sombre dans les deux thèmes
    <span className="font-mono text-xs text-[#a1a1aa]">{time ? `${time} ${suffix}` : "GMT"}</span>
  );
}
