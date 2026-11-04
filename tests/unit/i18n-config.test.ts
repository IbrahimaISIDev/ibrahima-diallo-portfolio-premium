import { describe, expect, it } from "vitest";
import { localePath, stripLocale } from "@/lib/i18n/config";

describe("localePath", () => {
  it("garde les chemins français à la racine", () => {
    expect(localePath("fr", "/")).toBe("/");
    expect(localePath("fr", "/about")).toBe("/about");
    expect(localePath("fr", "/#contact")).toBe("/#contact");
  });

  it("préfixe les chemins anglais par /en", () => {
    expect(localePath("en", "/")).toBe("/en");
    expect(localePath("en", "/about")).toBe("/en/about");
    expect(localePath("en", "/projects/tekkil")).toBe("/en/projects/tekkil");
  });

  it("colle l'ancre et les paramètres de l'accueil au préfixe, sans barre finale", () => {
    expect(localePath("en", "/#contact")).toBe("/en#contact");
    expect(localePath("en", "/?ref=cv#projects")).toBe("/en?ref=cv#projects");
    expect(localePath("en", "/about#skills")).toBe("/en/about#skills");
  });
});

describe("stripLocale", () => {
  it("retire le préfixe de langue, y compris /fr des URL réécrites", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/about")).toBe("/about");
    expect(stripLocale("/fr/projects/tekkil")).toBe("/projects/tekkil");
    expect(stripLocale("/about")).toBe("/about");
    expect(stripLocale("/english")).toBe("/english");
  });
});
