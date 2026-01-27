import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en"] as const;

export const routing = defineRouting({
    locales,
    defaultLocale: "fr",
    localePrefix: "as-needed",
});

const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

export { Link, redirect, usePathname, useRouter };
