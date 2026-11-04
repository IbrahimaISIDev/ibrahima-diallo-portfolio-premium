import { describe, expect, it } from "vitest";
import { alternateLanguages, ogImagePath, pageMetadata } from "@/lib/metadata";

describe("ogImagePath", () => {
  it("donne l'adresse publique de l'image de partage dans chaque langue", () => {
    expect(ogImagePath("fr")).toBe("/opengraph-image");
    expect(ogImagePath("en")).toBe("/en/opengraph-image");
    expect(ogImagePath("fr", "/projects/tekkil")).toBe("/projects/tekkil/opengraph-image");
    expect(ogImagePath("en", "/projects/tekkil")).toBe("/en/projects/tekkil/opengraph-image");
  });
});

describe("pageMetadata", () => {
  it("renseigne l'URL canonique, les versions hreflang et la locale Open Graph", () => {
    const meta = pageMetadata({ title: "About", description: "…", path: "/about", locale: "en" });
    expect(meta.alternates).toEqual({
      canonical: "/en/about",
      languages: alternateLanguages("/about"),
    });
    expect(alternateLanguages("/about")).toEqual({
      fr: "/about",
      en: "/en/about",
      "x-default": "/about",
    });
    expect(meta.openGraph).toMatchObject({ locale: "en_US", alternateLocale: ["fr_FR"] });
  });
});
