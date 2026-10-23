import { expect, test } from "@playwright/test";

const pages = ["/", "/en", "/about", "/projects", "/cv", "/contact", "/projects/tekkil"];

for (const path of pages) {
  test(`${path} se charge avec un h1 et sans erreur JavaScript`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("une route inconnue affiche la page 404", async ({ page }) => {
  const response = await page.goto("/cette-page-n-existe-pas");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("disparu");
});

test("la navigation du header ramène vers les sections de l'accueil depuis une autre page", async ({
  page,
}) => {
  await page.goto("/cv");
  await page
    .getByRole("navigation", { name: "Navigation principale" })
    .getByRole("link", { name: "Expertise" })
    .click();
  await expect(page).toHaveURL(/\/#expertise$/);
  await expect(page.locator("section#expertise")).toBeInViewport();
});

test("l'accueil anglais est servi sous /en, avec ses textes et sa langue", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact me" }).first()).toHaveAttribute(
    "href",
    "/en#contact",
  );
  // Version française de l'accueil : la racine du site, sans préfixe de langue
  await expect(page.locator('link[rel="alternate"][hreflang="fr"]')).toHaveAttribute(
    "href",
    /^https:\/\/[^/]+\/?$/,
  );
});

test("le sélecteur de langue mène à la même page dans l'autre langue", async ({ page }) => {
  await page.goto("/about");
  await page
    .getByRole("navigation", { name: "Langue du site" })
    .getByRole("link", { name: "English" })
    .click();
  await expect(page).toHaveURL(/\/en\/about$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");

  await page
    .getByRole("navigation", { name: "Site language" })
    .getByRole("link", { name: "Français" })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
});

test("une carte de projet de l'accueil ouvre son étude de cas", async ({ page }) => {
  await page.goto("/");
  await page
    .locator("section#projects")
    .getByRole("link", { name: /Tekkil/ })
    .click();
  await expect(page).toHaveURL(/\/projects\/tekkil$/);
});

test("le lien d'évitement mène au contenu principal", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Aller au contenu" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("le menu mobile s'ouvre, garde le focus et se ferme avec Échap", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
  await toggle.click();
  const dialog = page.getByRole("dialog", { name: "Menu de navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link").first()).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Ouvrir le menu" })).toBeFocused();
});

test("le bouton de thème bascule entre sombre et clair", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveClass(/dark/);
  await page.getByRole("button", { name: "Changer de thème" }).first().click();
  await expect(html).toHaveClass(/light/);
});

test("le filtre du portfolio n'affiche que les projets de la catégorie", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "E-commerce", exact: true }).click();
  const cards = page.locator("#project-list h2");
  await expect(cards).toHaveText(["Fily Mode Royale"]);
});

test("le header indique la section active, au défilement et sur les pages dédiées", async ({
  page,
}) => {
  const nav = page.getByRole("navigation", { name: "Navigation principale" });

  await page.goto("/");
  await page.evaluate(() =>
    document.getElementById("projects")?.scrollIntoView({ block: "start", behavior: "instant" }),
  );
  await expect(nav.getByRole("link", { name: "Projets" })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await page.goto("/about");
  await expect(nav.getByRole("link", { name: "À propos" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});
