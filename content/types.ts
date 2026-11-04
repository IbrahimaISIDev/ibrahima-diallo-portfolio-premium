import type { Locale, Localized } from "@/lib/i18n/config";

// Valeur traduite, ou identique dans les deux langues (noms propres, technologies)
export type Translatable = string | Localized<string>;

export function resolve(value: Translatable, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}

export function resolveAll(values: readonly Translatable[], locale: Locale): string[] {
  return values.map((value) => resolve(value, locale));
}
