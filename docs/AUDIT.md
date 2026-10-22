# Rapport d'audit — Portfolio Ibrahima Sory Diallo

| | |
|---|---|
| **Date** | 22 octobre 2026 |
| **Révision auditée** | `afd6843` (branche `main`, arbre propre) |
| **Stack** | Next.js 16.1.5 (App Router, Turbopack) · React 19.2 · TypeScript 5 (strict) · Tailwind CSS v4 · Framer Motion 12 · Resend 6 |
| **Périmètre** | Tout le code source (`app/`, `components/`, `data/`, `lib/`, `types/`), la configuration, les assets `public/`, les dépendances, le build de production et le rendu HTML servi |

---

## Sommaire

1. [Synthèse](#1-synthèse)
2. [Méthode](#2-méthode)
3. [Cartographie du projet](#3-cartographie-du-projet)
4. [Points forts](#4-points-forts)
5. [Constats détaillés](#5-constats-détaillés)
   - [5.1 Bugs fonctionnels](#51-bugs-fonctionnels)
   - [5.2 Sécurité et dépendances](#52-sécurité-et-dépendances)
   - [5.3 SEO et partage social](#53-seo-et-partage-social)
   - [5.4 Performance](#54-performance)
   - [5.5 Accessibilité](#55-accessibilité)
   - [5.6 Design, thème clair et cohérence UI](#56-design-thème-clair-et-cohérence-ui)
   - [5.7 Contenu et crédibilité](#57-contenu-et-crédibilité)
   - [5.8 Qualité du code et maintenabilité](#58-qualité-du-code-et-maintenabilité)
   - [5.9 Outillage, documentation et DevOps](#59-outillage-documentation-et-devops)
6. [Plan d'action priorisé](#6-plan-daction-priorisé)
7. [Annexes](#7-annexes)

---

## 1. Synthèse

Le portfolio repose sur une base saine : une architecture App Router claire, du contenu piloté par des fichiers `data/`, TypeScript en mode strict, et un build de production qui passe sans erreur. L'identité visuelle « Premium Sénégal » est cohérente en thème sombre.

L'audit relève toutefois des problèmes **visibles par les visiteurs** à corriger en priorité :

- **Le formulaire de contact peut afficher « Message envoyé ! » alors que l'email n'est pas parti** : l'erreur renvoyée par Resend est ignorée.
- **La navigation est cassée hors de la page d'accueil** : tous les liens du header et du footer sont des ancres (`#about`, `#contact`…) qui ne mènent nulle part depuis `/cv`, `/projects/*`, `/about` ou `/contact`.
- **Toute la page est rendue invisible côté serveur** (`opacity:0`) jusqu'à l'hydratation JavaScript, ce qui pénalise le LCP et l'affichage sans JS.
- **La police des titres ne charge jamais** : la classe `font-display` pointe vers « Sora », qui n'est pas chargée, et retombe donc sur la police système.
- **Le SEO est en partie cassé** : l'image Open Graph est en 404, le sitemap annonce deux pages en 404 (`/portfolio`, `/blog`) et omet `/cv` et `/projects`.
- **Next.js a une vulnérabilité critique** (corrigée en 16.4.2).
- **Le thème clair a des contrastes insuffisants** (l'ambre sur fond clair donne un ratio de 2,05:1).

### Tableau de bord

| Axe | Note | Commentaire |
|---|:-:|---|
| Architecture | 7/10 | Structure claire, données séparées du rendu ; quelques doublons de configuration |
| Qualité du code | 5/10 | 12 erreurs et 31 avertissements ESLint, 5 composants morts, beaucoup d'imports inutilisés |
| Fonctionnel | 5/10 | Formulaire non fiable, navigation multi-pages cassée, « 18++ » affiché |
| Sécurité | 4/10 | Next.js vulnérable (critique), API de contact sans validation ni limitation de débit, aucun en-tête de sécurité |
| Performance | 5/10 | 253 Ko de JS gzip sur l'accueil, contenu SSR masqué, images non optimisées à la source |
| Accessibilité | 4/10 | Curseur natif masqué, contrastes en échec, contenus accessibles uniquement au survol, menu mobile incomplet |
| SEO | 4/10 | Image OG manquante, sitemap faux, pas de canonical ni de JSON-LD, métadonnées incomplètes |
| Contenu | 5/10 | Chiffres incohérents, témoignages à vérifier, aucun lien vers des démos ou du code |
| DevOps / docs | 2/10 | Ni tests, ni CI, ni `.env.example` ; README obsolète |

### Décompte des constats

| Sévérité | Nombre | Définition |
|---|:-:|---|
| 🔴 Critique | 7 | Bug visible, perte de données ou faille : à corriger avant tout ajout |
| 🟠 Majeur | 24 | Dégrade nettement l'UX, le SEO, l'accessibilité ou la crédibilité |
| 🟡 Mineur | 29 | Dette technique, incohérence ou finition |
| 🔵 Suggestion | 6 | Amélioration recommandée, sans défaut actuel |
| **Total** | **66** | |

---

## 2. Méthode

L'audit combine une lecture intégrale du code et des vérifications outillées :

| Vérification | Commande / moyen | Résultat |
|---|---|---|
| Lecture de code | Lecture ligne à ligne des 60 fichiers source | Voir § 5 |
| Typage | `npx tsc --noEmit` | ✅ 0 erreur |
| Lint | `npx eslint .` | ❌ **12 erreurs, 31 avertissements** (annexe A) |
| Build | `next build` | ✅ Succès, 16 pages générées |
| Dépendances | `npm audit` | ❌ **23 vulnérabilités** dont 1 critique et 15 hautes (annexe B) |
| Rendu réel | `next start` + `curl` sur chaque route | 404 détectés : `/portfolio`, `/blog`, `/og-image.jpg` |
| Poids JS | Somme des chunks chargés par `/` | 14 chunks, 813 Ko bruts, **253 Ko gzip** |
| CSS compilé | Inspection du CSS servi | `.font-display{font-family:Sora,…}`, police non chargée |
| Contrastes | Calcul WCAG 2.x sur la palette | 6 combinaisons en échec (annexe C) |
| Assets | `file`, `du` sur `public/` | Faux PNG (JPEG), 688 Ko d'image inutilisée, favicon par défaut |

---

## 3. Cartographie du projet

```
app/
├── layout.tsx            Layout racine : polices, ThemeProvider, CustomCursor, Header, PageTransition, Footer
├── page.tsx              Accueil : Hero → Services → Stats → About → Process → Portfolio → Testimonials → Freelancing → Contact
├── about/ contact/ projects/          Pages secondaires (server components)
├── projects/[slug]/      Étude de cas (SSG via generateStaticParams)
├── blog/[slug]/          Article (dynamique, section Blog « désactivée » mais route active)
├── cv/                   CV interactif (entièrement "use client")
├── api/contact/route.ts  Envoi d'email via Resend
├── sitemap.ts robots.ts not-found.tsx
components/
├── layout/   Header, MobileMenu, Footer
├── sections/ 14 sections (dont CircularStack inutilisé)
├── shared/   18 composants d'animation et utilitaires (dont 3 inutilisés)
└── ui/       Button (inutilisé)
data/         personal, projects, experience, skills, services, testimonials, workflow, blog, navigation
lib/          animations (variants Framer), constants (siteConfig), utils (cn)
types/        Interfaces Project, Skill, Experience…
```

**Routes générées** : `/`, `/about`, `/contact`, `/cv`, `/projects`, `/projects/[5 slugs]` (SSG), `/blog/[slug]` (dynamique), `/api/contact` (dynamique), `/robots.txt`, `/sitemap.xml`.

---

## 4. Points forts

- **Séparation contenu / présentation** : toute l'information éditoriale vit dans `data/`, ce qui facilitera une future migration vers un CMS.
- **TypeScript strict** activé ; `tsc` ne remonte aucune erreur.
- **SSG des études de cas** via `generateStaticParams`, et `notFound()` correctement utilisé.
- **API Metadata de Next** utilisée (titre, description, OG, Twitter), avec `metadataBase` défini.
- **`next/font`** pour l'auto-hébergement des polices et **`next/image`** pour les photos.
- **Thème sombre/clair** avec `next-themes`, sans flash au chargement (script injecté).
- **Feuille de style d'impression** dédiée au CV.
- **Identité visuelle** cohérente et soignée en thème sombre, avec des micro-interactions de qualité.
- **`lang="fr"`**, labels de formulaire associés (`htmlFor`), `aria-label` sur les boutons icônes.

---

## 5. Constats détaillés

Chaque constat porte un identifiant, une sévérité, sa localisation, une preuve et une recommandation.

### 5.1 Bugs fonctionnels

#### F-01 🔴 Le formulaire affiche « Message envoyé » même quand l'envoi échoue
- **Où** : [app/api/contact/route.ts:28-43](../app/api/contact/route.ts#L28-L43)
- **Constat** : avec Resend v6, `resend.emails.send()` **ne lève pas d'exception** en cas d'échec. Elle renvoie `{ data, error }`. Le code renvoie cet objet avec un statut 200 sans tester `error`. Côté client, [Contact.tsx:36](../components/sections/Contact.tsx#L36) se fie à `response.ok` et affiche donc un succès.
- **Impact** : des prospects croient avoir écrit alors que le message est perdu. Le risque est élevé avec l'expéditeur `onboarding@resend.dev` (mode bac à sable, voir S-04).
- **Recommandation** : `const { data, error } = await resend.emails.send(...)` ; si `error`, journaliser et renvoyer un statut 502. Ne renvoyer au client que `{ id }`.

#### F-02 🔴 Navigation cassée hors de la page d'accueil
- **Où** : [data/navigation.ts:4-9](../data/navigation.ts#L4-L9), [Header.tsx:40](../components/layout/Header.tsx#L40), [Header.tsx:69](../components/layout/Header.tsx#L69), [MobileMenu.tsx:40](../components/layout/MobileMenu.tsx#L40), [Footer.tsx:18](../components/layout/Footer.tsx#L18)
- **Constat** : tous les liens sont des ancres relatives (`#about`, `#contact`…). Sur `/cv`, `/projects/mimap`, `/about` ou `/contact`, un clic sur « Services » ou « Me contacter » ne fait rien, car l'ancre n'existe pas sur la page courante.
- **Recommandation** : utiliser `/#about`, `/#contact`… avec `next/link`, ou pointer vers les pages dédiées (`/about`, `/contact`, `/projects`) quand elles existent.

#### F-03 🔴 Tout le contenu est invisible tant que le JavaScript n'est pas chargé
- **Où** : [app/layout.tsx:77](../app/layout.tsx#L77), [PageTransition.tsx:8-12](../components/shared/PageTransition.tsx#L8-L12), [Header.tsx:26](../components/layout/Header.tsx#L26)
- **Preuve** (HTML servi) : `<div style="opacity:0;transform:translateY(20px)"><main>…` et `<header … style="transform:translateY(-100px)">`. On compte **61 éléments** rendus à `opacity:0` sur `/`.
- **Impact** : page blanche sans JS ou si l'hydratation échoue, LCP retardé, risque d'indexation dégradée.
- **Problème annexe** : `PageTransition` est monté dans le layout, qui persiste entre les navigations. L'animation ne joue donc qu'au premier chargement, et l'état `exit` n'est jamais utilisé (aucun `AnimatePresence`).
- **Recommandation** : supprimer `PageTransition` du layout, ou le déplacer dans un `app/template.tsx` avec une animation sur `transform` uniquement, sans `opacity:0` initial. Pour le Hero et le header, laisser le premier rendu visible (`initial={false}` ou animation CSS).

#### F-04 🔴 La police des titres ne se charge jamais
- **Où** : [app/globals.css:23-25](../app/globals.css#L23-L25) et [app/layout.tsx:11-27](../app/layout.tsx#L11-L27)
- **Constat** : le layout charge **Inter**, **Plus Jakarta Sans** et **JetBrains Mono** via `next/font`, mais `@theme inline` fixe `--font-display: "Sora"` et `--font-body: "DM Sans"`. Avec `inline`, Tailwind écrit la valeur en dur dans l'utilitaire. Le CSS compilé contient `.font-display{font-family:Sora,system-ui,sans-serif}`, et Sora n'est jamais chargée.
- **Impact** : tous les éléments portant la classe `font-display` (titres de sections, logo, cartes) s'affichent dans la police système. Les `h1`–`h6` sans cette classe héritent, eux, de Plus Jakarta Sans. La typographie est donc incohérente d'un titre à l'autre.
- **Recommandation** : dans `@theme`, référencer les variables de `next/font` (`--font-display: var(--font-display-loaded)`…), ou charger réellement Sora et DM Sans. Choisir un seul couple de polices et le documenter.

#### F-05 🟠 Affichage « 18++ » dans le Hero
- **Où** : [Hero.tsx:162-163](../components/sections/Hero.tsx#L162-L163) avec [data/personal.ts:20](../data/personal.ts#L20)
- **Constat** : `stats.projects` vaut déjà `"18+"`, et le JSX ajoute `<span>+</span>`. Rendu vérifié : `18+<span>+</span>`. La même erreur existe dans `About.tsx:25` (code mort).
- **Recommandation** : stocker des nombres (`projects: 18`) et formater à l'affichage.

#### F-06 🟠 Le blog est « désactivé » mais toujours public et indexé
- **Où** : [app/page.tsx:23](../app/page.tsx#L23), [app/sitemap.ts:21-25](../app/sitemap.ts#L21-L25), [app/blog/[slug]/page.tsx](../app/blog/%5Bslug%5D/page.tsx)
- **Constat** : la section est commentée, mais les 3 articles répondent en 200 et figurent dans le sitemap. Le bouton « Retour au blog » pointe vers `/#blog`, qui n'existe plus.
- **Recommandation** : décider entre deux options. Pour désactiver vraiment le blog, retirer les routes du sitemap et renvoyer `notFound()`. Pour le réactiver, créer `/blog` (liste) et corriger le rendu (F-07).

#### F-07 🟠 Les articles affichent du Markdown brut (`### Titre`)
- **Où** : [app/blog/[slug]/page.tsx:84](../app/blog/%5Bslug%5D/page.tsx#L84), [data/blog.ts](../data/blog.ts)
- **Constat** : le contenu est en pseudo-Markdown avec entités HTML (`d&eacute;fi`). Le rendu remplace seulement `\n` par `<br/>` : les `###` apparaissent tels quels. La classe `prose` est utilisée alors que `@tailwindcss/typography` n'est pas installé.
- **Recommandation** : passer à du MDX (`@next/mdx`) ou à un parseur Markdown, écrire le contenu en UTF-8 sans entités, et installer `@tailwindcss/typography`.

#### F-08 🟠 Clés React dupliquées sur la page CV
- **Où** : [app/cv/page.tsx:132](../app/cv/page.tsx#L132)
- **Constat** : `key={exp.company}`, alors que deux expériences ont `company: "Saraya Tech Sénégal"` ([data/experience.ts:6](../data/experience.ts#L6) et [:20](../data/experience.ts#L20)). React émet un avertissement et peut mal réconcilier la liste.
- **Recommandation** : ajouter un `id` unique à chaque expérience.

#### F-09 🟠 Classement formation / expérience fragile
- **Où** : [app/cv/page.tsx:130](../app/cv/page.tsx#L130) et [:178](../app/cv/page.tsx#L178)
- **Constat** : le tri repose sur `title.includes("Licence") || title.includes("Apprenant")`. Renommer un intitulé suffit à déplacer une entrée dans la mauvaise section.
- **Recommandation** : ajouter `type: "work" | "education"` dans `Experience` ([types/index.ts:31](../types/index.ts#L31)).

#### F-10 🟡 Le lien « Réserver un appel » pointe vers un Calendly marqué « Placeholder »
- **Où** : [data/personal.ts:16](../data/personal.ts#L16), [Hero.tsx:93](../components/sections/Hero.tsx#L93)
- **Recommandation** : vérifier que l'URL existe ; sinon, masquer le bouton.

#### F-11 🟡 Le filtre « E-commerce » renvoie une grille vide
- **Où** : [data/projects.ts:96-103](../data/projects.ts#L96-L103)
- **Recommandation** : dériver les catégories des projets (`new Set(projects.map(p => p.category))`).

#### F-12 🟡 Fonction d'impression du CV retirée, mais l'impression reste fragile
- **Où** : [app/cv/page.tsx:26](../app/cv/page.tsx#L26) (`handlePrint` inutilisé), [:218-223](../app/cv/page.tsx#L218-L223)
- **Constat** : les barres de compétences et les blocs animés `whileInView` restent à largeur 0 ou opacité 0 s'ils n'ont pas été affichés à l'écran avant l'impression. La feuille `@media print` existe mais n'est plus accessible via un bouton.
- **Recommandation** : en `@media print`, forcer `opacity:1; transform:none` et les largeurs ; ou retirer complètement l'option d'impression et ne garder que le PDF.

---

### 5.2 Sécurité et dépendances

#### S-01 🔴 Next.js 16.1.5 : vulnérabilité critique
- **Constat** : `npm audit` signale `next` comme **critique** (HTTP request smuggling dans les rewrites, croissance non bornée du cache disque de `next/image`), ainsi que `postcss` et `sharp` (hautes) transitivement. Un correctif existe en **16.4.2** (même version majeure).
- **Recommandation** : `npm i next@16.4.2 eslint-config-next@16.4.2`, puis `npm audit fix` pour les dépendances transitives (`nanoid`, `uuid`, `source-map-js`…). Mettre `resend` à jour (vulnérabilité modérée via `svix`/`uuid`).

#### S-02 🟠 API de contact : validation minimale
- **Où** : [app/api/contact/route.ts:10-18](../app/api/contact/route.ts#L10-L18)
- **Constat** : seule la présence des champs est vérifiée. Il n'y a ni contrôle de type (un objet passe), ni de format d'email, ni de longueur maximale, ni de nettoyage des retours à la ligne dans `subject`. Le corps n'est pas limité en taille.
- **Recommandation** : valider avec un schéma (`zod`) : chaînes, email valide, longueurs bornées (nom ≤ 100, sujet ≤ 150, message ≤ 5 000), suppression des `\r\n` dans le sujet.

#### S-03 🟠 Aucune protection anti-spam ni limitation de débit
- **Constat** : l'endpoint est public et appelable en boucle, ce qui permet d'épuiser le quota Resend et d'inonder la boîte mail.
- **Recommandation** : ajouter un champ honeypot caché, une limitation de débit par IP (Upstash Ratelimit, Vercel KV ou middleware), et éventuellement Cloudflare Turnstile.

#### S-04 🟠 Expéditeur Resend en mode bac à sable et email codé en dur
- **Où** : [route.ts:29-30](../app/api/contact/route.ts#L29-L30)
- **Constat** : `onboarding@resend.dev` ne délivre qu'à l'adresse du propriétaire du compte Resend et finit souvent en spam. Le destinataire est codé en dur au lieu de venir de la configuration.
- **Recommandation** : vérifier le domaine `ibrahimadev.com` dans Resend ; déplacer l'expéditeur et le destinataire dans des variables d'environnement (`CONTACT_FROM`, `CONTACT_TO`).

#### S-05 🟡 Aucun en-tête de sécurité HTTP
- **Où** : [next.config.ts](../next.config.ts)
- **Recommandation** : ajouter via `headers()` : `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `X-Frame-Options: DENY`. Mettre `poweredByHeader: false`.

#### S-06 🟡 `dangerouslySetInnerHTML` sur le contenu du blog
- **Où** : [app/blog/[slug]/page.tsx:84](../app/blog/%5Bslug%5D/page.tsx#L84)
- **Constat** : le risque est faible aujourd'hui (contenu statique local), mais il deviendra réel avec un CMS. À traiter en même temps que F-07.

#### S-07 🟡 Liens `target="_blank"` sans `rel`
- **Où** : [app/cv/page.tsx:263](../app/cv/page.tsx#L263)
- **Recommandation** : ajouter `rel="noopener noreferrer"`.

#### S-08 🔵 Données personnelles exposées
- **Constat** : le numéro de téléphone figure en clair dans le footer, le contact et le CV, ce qui l'expose au scraping et au spam. C'est un choix assumé pour un portfolio, à confirmer.

---

### 5.3 SEO et partage social

#### SEO-01 🔴 Image Open Graph inexistante
- **Où** : [lib/constants.ts:7](../lib/constants.ts#L7), [app/layout.tsx:43-50](../app/layout.tsx#L43-L50)
- **Preuve** : `GET /og-image.jpg` renvoie **404**. Les partages LinkedIn, WhatsApp et X s'affichent sans visuel. Le README référence aussi cette image.
- **Recommandation** : créer `app/opengraph-image.tsx` (génération dynamique via `ImageResponse`), ou ajouter une image 1200×630 dans `public/`.

#### SEO-02 🟠 Le sitemap contient des 404 et omet des pages réelles
- **Où** : [app/sitemap.ts:7](../app/sitemap.ts#L7)
- **Preuve** : `/portfolio` et `/blog` renvoient 404 ; `/cv` et `/projects` sont absentes ; les articles du blog « désactivé » sont présents ; `lastModified` vaut toujours la date du build.
- **Recommandation** : routes `["", "/about", "/projects", "/cv", "/contact"]`, et une vraie date pour chaque entrée.

#### SEO-03 🟠 Les études de cas héritent des balises OG de l'accueil
- **Où** : [app/projects/[slug]/page.tsx:18-27](../app/projects/%5Bslug%5D/page.tsx#L18-L27)
- **Preuve** : sur `/projects/mimap`, `og:title`, `og:description`, `og:url` et `og:image` sont ceux de l'accueil.
- **Recommandation** : renseigner `openGraph` (titre, description, `url`, `images: [project.image]`) et `alternates.canonical`.

#### SEO-04 🟠 Pages sans métadonnées propres
- **Constat** : `/cv` est un composant client ([app/cv/page.tsx:1](../app/cv/page.tsx#L1)) et ne peut donc pas exporter `metadata` : elle reprend le titre de l'accueil. `/blog/[slug]` n'a pas de `generateMetadata` (l'import `Metadata` est inutilisé).
- **Recommandation** : faire de `cv/page.tsx` un server component qui exporte `metadata` et rend un composant client `<ResumeView/>`. Ajouter `generateMetadata` et `generateStaticParams` au blog.

#### SEO-05 🟡 Pas d'URL canonique ni de données structurées
- **Recommandation** : `alternates: { canonical: "/" }` au niveau racine, plus un JSON-LD `Person` (nom, poste, `sameAs` LinkedIn/GitHub, adresse Dakar) dans le layout.

#### SEO-06 🟡 Domaine incohérent
- **Constat** : `siteConfig.url = "https://ibrahimadev.com"` ([lib/constants.ts:6](../lib/constants.ts#L6)), mais le CV affiche `ibrahima.dev` ([app/cv/page.tsx:100](../app/cv/page.tsx#L100)). Vérifier quel domaine est réellement en production.

#### SEO-07 🔵 Favicon par défaut de Next.js
- **Où** : [app/favicon.ico](../app/favicon.ico) (empreinte identique au favicon de `create-next-app`)
- **Recommandation** : un favicon personnel (monogramme « IH »), plus `icon.png`, `apple-icon.png` et un `manifest.ts`.

---

### 5.4 Performance

#### P-01 🟠 253 Ko de JavaScript gzip sur l'accueil
- **Constat** : 14 chunks, 813 Ko bruts. Toutes les sections sont `"use client"` et embarquent Framer Motion, `canvas-confetti` (chargé dès le header) et `next-themes`.
- **Recommandation** : rendre statiques côté serveur les sections qui n'ont pas besoin d'interactivité, en isolant l'animation dans de petits wrappers clients. Charger `canvas-confetti` à la demande (`await import()` au clic). Utiliser `LazyMotion` + `domAnimation` de Framer Motion (`m.div` au lieu de `motion.div`).

#### P-02 🟠 Contenu SSR masqué (voir F-03)
- Les 61 éléments à `opacity:0` retardent le LCP. C'est le gain de performance perçue le plus important.

#### P-03 🟡 Images source lourdes et mal nommées
- **Constat** : les 6 fichiers `public/images/projects/*.png` sont en réalité des **JPEG** 1024×1024 de 535 à 690 Ko, avec une extension trompeuse (le `Content-Type` envoyé est `image/png`). Le format carré est recadré en 16:10 ou 16:9. `teranga-farm.png` (688 Ko) n'est utilisé nulle part. La photo de profil fait 1920×2560.
- **Recommandation** : convertir en WebP/AVIF au bon ratio (1600×1000), avec des extensions correctes. Ajouter `images: { formats: ["image/avif", "image/webp"] }` dans `next.config.ts`. Supprimer les fichiers inutilisés.

#### P-04 🟡 Re-renders à chaque mouvement de souris
- **Où** : [MagneticButton.tsx:27](../components/shared/MagneticButton.tsx#L27) (`setState` à chaque `mousemove`), [CustomCursor.tsx:48](../components/shared/CustomCursor.tsx#L48) (`isVisible` dans les dépendances : les écouteurs sont désabonnés puis réabonnés)
- **Recommandation** : utiliser des `useMotionValue` à la place du state, comme le fait déjà `SpotlightCard`.

#### P-05 🟡 Écouteur de scroll non passif
- **Où** : [Header.tsx:19](../components/layout/Header.tsx#L19)
- **Recommandation** : `{ passive: true }`, ou `useScroll` + `useMotionValueEvent` de Framer Motion.

#### P-06 🟡 Animations infinies hors écran
- **Constat** : marquee, rotations du Hero, motif du bloc Freelancing, `animate-ping` du Process. Elles tournent en permanence, y compris hors écran et sur mobile.
- **Recommandation** : les suspendre hors du viewport (`useInView`) et respecter `prefers-reduced-motion` (A-02).

---

### 5.5 Accessibilité

#### A-01 🔴 Curseur natif masqué partout
- **Où** : [app/globals.css:70-74](../app/globals.css#L70-L74), [CustomCursor.tsx:50](../components/shared/CustomCursor.tsx#L50)
- **Constat** : `* { cursor: none !important }` s'applique à tout appareil `pointer: fine`. Or `CustomCursor` renvoie `null` dès que `"ontouchstart" in window`, ce qui est le cas des **PC portables tactiles avec souris** : l'utilisateur n'a alors **plus aucun curseur**. Le test côté client provoque en plus un écart d'hydratation. Le curseur personnalisé ignore aussi les champs de formulaire (pas de curseur texte).
- **Recommandation** : ne masquer le curseur natif que lorsque le curseur personnalisé est effectivement monté (classe ajoutée sur `<html>` par le composant), l'exclure sous `prefers-reduced-motion`, et garder le curseur natif sur `input`/`textarea`.

#### A-02 🟠 `prefers-reduced-motion` ignoré par Framer Motion
- **Où** : [app/globals.css:138-145](../app/globals.css#L138-L145)
- **Constat** : la règle CSS ne couvre que les animations CSS. Les animations Framer Motion (en JS) et les confettis continuent de jouer.
- **Recommandation** : envelopper l'app dans `<MotionConfig reducedMotion="user">` et passer `disableForReducedMotion: true` à `canvas-confetti`.

#### A-03 🟠 Contrastes insuffisants (WCAG AA)
- **Constat** (détail en annexe C) :
  - thème clair : ambre `#F59E0B` sur fond clair = **2,05:1** (sous-titres, dates, liens, boutons `bg-secondary text-background`) ;
  - badge « Live » `text-green-400` sur blanc = **1,74:1** ;
  - thème sombre : `text-primary-light` (noms d'entreprise) = **3,39 à 3,68:1** ; `text-muted-dark` (tags, petites mentions en 9–10 px) = **3,65 à 3,97:1**.
- **Recommandation** : en thème clair, redéfinir `--secondary` en `#B45309` (amber-700, environ 5:1). En sombre, éclaircir `--primary-light` pour les textes (par exemple `#4CAF50`) et `--muted-dark`. Éviter les textes de 9–10 px.

#### A-04 🟠 Contenus accessibles uniquement au survol
- **Où** : [Portfolio.tsx:118](../components/sections/Portfolio.tsx#L118) (actions des cartes en `opacity-0` + `group-hover`), [FlippableCard.tsx:35-36](../components/sections/FlippableCard.tsx#L35-L36) (retournement au survol uniquement ; `handleFlip` existe mais n'est jamais branché)
- **Constat** : au clavier, les liens restent focalisables mais invisibles. Sur mobile, les technologies des services ne sont pas accessibles de façon fiable.
- **Recommandation** : ajouter `group-focus-within:opacity-100`. Rendre la carte activable (`button`, `onClick`, `onKeyDown`, `aria-pressed`) et masquer la face cachée aux lecteurs d'écran (`aria-hidden`).

#### A-05 🟠 Menu mobile incomplet
- **Où** : [Header.tsx:81-85](../components/layout/Header.tsx#L81-L85), [MobileMenu.tsx](../components/layout/MobileMenu.tsx)
- **Constat** : pas d'`aria-expanded` ni d'`aria-controls` ; pas de fermeture avec Échap ; pas de piège de focus ; le défilement de la page en arrière-plan n'est pas bloqué.
- **Recommandation** : ajouter ces attributs et comportements, ou utiliser un `Dialog` accessible (Radix ou Headless UI).

#### A-06 🟡 Carrousel de témoignages
- **Où** : [Testimonials.tsx](../components/sections/Testimonials.tsx)
- **Constat** : pas de région `aria-live` ; les pastilles de navigation font 8 px (cible tactile recommandée : 24 px minimum).

#### A-07 🟡 Pas de lien d'évitement (« Aller au contenu »)
- **Recommandation** : ajouter un lien `sr-only focus:not-sr-only` vers `#main` dans le layout.

#### A-08 🟡 Hiérarchie de titres
- **Constat** : `not-found.tsx` n'a pas de `h1` ; le footer utilise des `h4` sans `h2`/`h3` parents ; le CV passe de `h3` à `h5`.

#### A-09 🟡 Le logo est un `div` cliquable qui enveloppe un lien
- **Où** : [ConfettiTrigger.tsx:55](../components/shared/ConfettiTrigger.tsx#L55)
- **Recommandation** : déclencher les confettis depuis le `onClick` du lien lui-même.

---

### 5.6 Design, thème clair et cohérence UI

#### D-01 🟠 Le thème clair n'est pas réellement pris en charge
- **Constat** : de nombreuses couleurs sont codées en dur et ne s'adaptent pas au thème :
  - `SkillsWall` : `text-blue-400`, `rose-400`, `amber-400`, `emerald-400`, `purple-400` ;
  - fond de code `bg-[#0d1117]` ([projects/[slug]/page.tsx:160](../app/projects/%5Bslug%5D/page.tsx#L160)) ;
  - motif `body::before` en `rgba(255,255,255,.1)`, invisible en clair ([globals.css:85-97](../app/globals.css#L85-L97)) ;
  - sélection de texte `foreground` sur `primary` (2,27:1 en clair, [globals.css:132-135](../app/globals.css#L132-L135)).
- **Recommandation** : tokeniser toutes les couleurs, puis vérifier chaque section en thème clair. Autre option : ne proposer que le thème sombre si le thème clair n'est pas une priorité.

#### D-02 🟡 Mélange français / anglais dans l'interface
- **Exemples** : « Architecture System », « Technical Spotlight », « Core Stack », « Source Code », « Stack Items », « +N more », « Discovery », « Development », « QA & Launch », « Scroll », « Back to top », « Digital Signature ».
- **Recommandation** : tout franciser ou préparer une i18n (FR/EN), qui serait pertinente pour l'objectif « recruteurs internationaux » du brief.

#### D-03 🟡 Titres de sections dupliqués
- **Constat** : « Travaillons ensemble » est le titre de **About** ([About.tsx:39](../components/sections/About.tsx#L39)) et de **Contact** ([Contact.tsx:56](../components/sections/Contact.tsx#L56)), ainsi que le CTA de `/about`.

#### D-04 🟡 Contenu redondant entre l'accueil et `/about`
- **Constat** : valeurs, parcours et compétences sont présentés deux fois avec des rendus différents. L'accueil est très long (9 sections).
- **Recommandation** : alléger la section About de l'accueil (accroche + lien « En savoir plus » vers `/about`).

#### D-05 🔵 Signaux d'interactivité trompeurs
- **Constat** : le statut « Live » s'affiche avec une pastille verte pulsante pour tous les projets, sans aucun lien live. La citation « Ce projet démontre ma capacité… » est identique sur toutes les études de cas ([projects/[slug]/page.tsx:217-219](../app/projects/%5Bslug%5D/page.tsx#L217-L219)).

---

### 5.7 Contenu et crédibilité

Pour un portfolio, la crédibilité du contenu compte autant que le code.

#### C-01 🟠 Chiffres incohérents avec le parcours affiché
- **Constat** : « 03+ ans d'expérience » et « 10+ clients satisfaits » ([data/personal.ts:18-23](../data/personal.ts#L18-L23)), alors que la timeline montre un bootcamp en 2024, un stage à partir de mars 2025 et un CDD depuis décembre 2025. Un recruteur fera le calcul.
- **Recommandation** : afficher des chiffres vérifiables (« 2 ans de pratique dont 1 an en entreprise », « 5 projets livrés ») ou les justifier.

#### C-02 🟠 Témoignages à vérifier
- **Où** : [data/testimonials.ts](../data/testimonials.ts)
- **Constat** : trois témoignages nominatifs (dont « Amadou Ba, CEO, Saraya Tech » et « Fatou Diop, Directrice, Clinique MIMAP ») sans photo, lien ni source.
- **Recommandation** : n'afficher que des témoignages **réels et consentis**, idéalement liés à un profil LinkedIn ou à une recommandation publique. Un faux témoignage découvert discrédite tout le portfolio.

#### C-03 🟠 Aucun projet n'a de lien démo ni de code source
- **Constat** : aucun projet de [data/projects.ts](../data/projects.ts) ne renseigne `liveUrl` ou `githubUrl`, donc les boutons « Lancer le Live » et « Source Code » ne s'affichent jamais. Tous les projets sont pourtant marqués « Live ».
- **Recommandation** : ajouter les liens disponibles (même un dépôt de démonstration). Sinon, utiliser les statuts « Privé / Client » et « Concept » de façon honnête.

#### C-04 🟡 Études de cas inégales
- **Constat** : seuls MIMAP et Gestion de Flotte ont une architecture et des défis ; AEM-UNCHK, Portfolio et Dashboard Analytics n'ont qu'une description d'une ligne. « Dashboard Analytics » est générique (pas de client ni de contexte).

#### C-05 🟡 Données obsolètes ou divergentes
- **Constat** :
  - « Next.js 15 » dans [data/projects.ts:76](../data/projects.ts#L76) et le README, alors que le projet utilise Next.js 16 ;
  - **Teranga Farm** est cité dans le README et le brief, et son image existe, mais il manque dans les données. *Correction (phase 2) : son retrait était volontaire (commit `1da7135`, recentrage sur le profil de développeur). Il faut donc retirer l'image inutilisée et la mention du README, pas l'ajouter.* ;
  - « © 2026 » est codé en dur dans le CV ([cv/page.tsx:269](../app/cv/page.tsx#L269)) ;
  - les dates des articles de blog sont antérieures à certaines expériences qu'ils décrivent.

#### C-06 🔵 Barres de compétences en pourcentage
- **Constat** : « PHP / Laravel 95 % », « React 95 % »… Les pourcentages auto-attribués sont souvent mal perçus par les recruteurs (« 95 % de quoi ? »). PHP/Laravel y apparaît aussi au-dessus de NestJS, alors que le positionnement met NestJS en avant.
- **Recommandation** : regrouper par niveau (« Quotidien / Confirmé / Notions ») ou par années de pratique.

---

### 5.8 Qualité du code et maintenabilité

#### Q-01 🟠 ESLint : 12 erreurs, 31 avertissements
- Le détail figure en annexe A. Principales catégories :
  - `react-hooks/set-state-in-effect` dans [ThemeToggle.tsx:14](../components/shared/ThemeToggle.tsx#L14) et [ReadingProgress.tsx:16](../components/shared/ReadingProgress.tsx#L16) ;
  - `no-explicit-any` dans [LightboxImage.tsx:25](../components/shared/LightboxImage.tsx#L25) et [ParallaxImage.tsx:29](../components/shared/ParallaxImage.tsx#L29) ;
  - `react/no-unescaped-entities` (×8) ;
  - 27 imports ou variables inutilisés.

#### Q-02 🟡 Code mort
- **Composants jamais importés** : `CircularStack`, `ConstellationBackground`, `MouseGlow`, `MotionWrapper`, `ui/Button`.
- **Variables mortes** : `y1`/`y2` (Hero), `highlights` (About), `yOffset` (Constellation), `handleFlip` (FlippableCard), `handlePrint` (CV), `Typewriter` importé mais non utilisé.
- **Données inutilisées** : `personalInfo.availability`, `personalInfo.services`, `Project.video`, `Project.longDescription`, `siteConfig.author.*`.
- **Assets inutilisés** : `public/{file,globe,next,vercel,window}.svg`, `teranga-farm.png`.

#### Q-03 🟡 Sources de vérité dupliquées
- **Constat** : l'email, le téléphone, la localisation et les réseaux sociaux sont définis dans `siteConfig` **et** dans `personalInfo`. L'email est aussi codé en dur dans l'API. « Dakar, Sénégal » est écrit en dur dans le footer. Le slogan du Hero est codé en dur au lieu d'utiliser `personalInfo.tagline`.
- **Recommandation** : une seule source (`personalInfo`), dont `siteConfig` dérive.

#### Q-04 🟡 Types incomplets ou contournés
- **Constat** :
  - `Skill.level` est optionnel mais utilisé comme nombre (`width: ${level}%` donnerait `undefined%`) ;
  - `navigationItems` n'est pas typé `NavItem[]` (le type est importé mais pas appliqué) ;
  - `Service`, `Testimonial` et `BlogPost` sont déclarés dans `data/` au lieu de `types/` ;
  - les `iconMap` reposent sur des chaînes non typées (`icon: string`).
- **Recommandation** : `icon: keyof typeof iconMap`, et `satisfies` pour les données.

#### Q-05 🟡 Logique dupliquée
- **Constat** : le logo est dupliqué (Header et Footer). La navigation précédent/suivant est dupliquée (projets et blog). Les styles de bouton sont répétés dans tout le projet alors qu'un composant `Button` existe sans être utilisé.

#### Q-06 🟡 Configuration expérimentale
- **Constat** : `experimental.viewTransition: true` ([next.config.ts:5-7](../next.config.ts#L5-L7)) est utilisé uniquement via `viewTransitionName` inline (avec `as any`). C'est une fonctionnalité expérimentale, à garder sous surveillance lors des mises à jour.

#### Q-07 🔵 Formatage incohérent
- **Constat** : indentation à 2 espaces dans certains fichiers et à 4 dans d'autres, et aucun Prettier n'est configuré.

---

### 5.9 Outillage, documentation et DevOps

#### O-01 🟠 Aucun test
- **Recommandation** : au minimum, Vitest pour la route `/api/contact` (validation, erreur Resend) et un test Playwright de fumée (chargement des pages, navigation, formulaire avec mock).

#### O-02 🟠 Aucune intégration continue
- **Recommandation** : un workflow GitHub Actions `lint → typecheck → build` sur chaque PR, plus Dependabot ou Renovate pour les mises à jour de sécurité (S-01 serait apparu automatiquement).

#### O-03 🟡 README obsolète
- **Constat** : il annonce Next.js 15, l'URL de clonage contient `[votre-pseudo]`, l'image d'aperçu est en 404, Teranga Farm est cité, et il ne documente ni les variables d'environnement (`RESEND_API_KEY`) ni le déploiement.

#### O-04 🟡 Pas de `.env.example`
- **Recommandation** : le créer avec `RESEND_API_KEY=`, `CONTACT_TO=`, `CONTACT_FROM=`.

#### O-05 🟡 Hygiène du dépôt
- **Constat** :
  - `package.json` a pour nom `"my-portfolio"` et ne déclare ni script `typecheck` ni champ `engines` ;
  - `portfolio-prompt-complet.md` (28 Ko, brief interne) est à la racine ;
  - avertissement au build : `turbopack.root` est déduit d'un `pnpm-lock.yaml` parent (propre au poste de développement, à fixer dans `next.config.ts`).
- **Recommandation** : déplacer le brief dans `docs/`, ajouter `"typecheck": "tsc --noEmit"` et `"engines": { "node": ">=20" }`.

#### O-06 🔵 Pas d'analytics ni de suivi d'erreurs
- **Recommandation** : Vercel Analytics / Speed Insights (Core Web Vitals réels) et, éventuellement, Sentry pour l'API.

---

## 6. Plan d'action priorisé

### Phase 1 : stabiliser (avant tout ajout), environ 1 jour

| # | Action | Constats |
|---|---|---|
| 1 | Mettre à jour Next.js en 16.4.2, puis `npm audit fix` | S-01 |
| 2 | Corriger la gestion d'erreur Resend et valider les entrées avec zod | F-01, S-02 |
| 3 | Transformer les ancres en `/#section` avec `next/link` | F-02 |
| 4 | Retirer `PageTransition` du layout et rendre le Hero et le header visibles au premier rendu | F-03, P-02 |
| 5 | Aligner les polices entre `@theme` et `next/font` | F-04 |
| 6 | Corriger « 18++ » (statistiques en nombres) | F-05 |
| 7 | Corriger le curseur personnalisé et ajouter `MotionConfig reducedMotion="user"` | A-01, A-02 |
| 8 | Créer l'image OG et corriger le sitemap | SEO-01, SEO-02 |
| 9 | Corriger les 12 erreurs ESLint | Q-01 |

### Phase 2 : fiabiliser et rendre crédible, 2 à 3 jours

| # | Action | Constats |
|---|---|---|
| 10 | Ajouter `id` et `type` aux expériences ; corriger le CV (clés, tri, impression, métadonnées) | F-08, F-09, F-12, SEO-04 |
| 11 | Ajouter les métadonnées OG et canonical par projet, ainsi que le JSON-LD `Person` | SEO-03, SEO-05 |
| 12 | Trancher sur le blog : le retirer proprement ou le réactiver en MDX | F-06, F-07, S-06 |
| 13 | Revoir les chiffres, les témoignages et les liens des projets ; compléter les études de cas | C-01 à C-05 |
| 14 | Corriger les contrastes et le thème clair (ou retirer le thème clair) | A-03, D-01 |
| 15 | Rendre les cartes, le menu mobile et le carrousel accessibles au clavier ; ajouter le lien d'évitement | A-04 à A-07 |
| 16 | Ajouter un honeypot et une limitation de débit ; configurer un expéditeur Resend sur domaine vérifié et les variables d'environnement | S-03, S-04, O-04 |

### Phase 3 : industrialiser et optimiser, 2 à 3 jours

| # | Action | Constats |
|---|---|---|
| 17 | Mettre en place la CI GitHub Actions et Dependabot | O-02 |
| 18 | Écrire les tests de l'API contact et un test de fumée Playwright | O-01 |
| 19 | Réduire le JS : sections en server components, `LazyMotion`, import dynamique des confettis | P-01, P-04 à P-06 |
| 20 | Optimiser les images (WebP/AVIF, bons ratios, extensions correctes) | P-03 |
| 21 | Nettoyer le code mort, unifier les données, ajouter Prettier | Q-02 à Q-05, Q-07 |
| 22 | Ajouter les en-têtes de sécurité, le favicon, le manifest et les analytics | S-05, SEO-07, O-06 |
| 23 | Mettre à jour le README et déplacer le brief dans `docs/` | O-03, O-05 |
| 24 | Harmoniser la langue de l'interface (ou mettre en place l'i18n FR/EN) | D-02 |

### Critères de sortie de l'audit

- `npm run lint` et `npx tsc --noEmit` sans erreur ; `npm audit --omit=dev` sans vulnérabilité haute ou critique.
- Toutes les URL du sitemap renvoient 200 ; l'image OG s'affiche dans le débogueur de partage LinkedIn.
- Lighthouse mobile ≥ 90 en Performance, Accessibilité, Bonnes pratiques et SEO (l'objectif du README est 95+).
- Formulaire testé : succès réel, erreur Resend affichée comme une erreur, spam bloqué.
- Navigation complète au clavier, de l'accueil jusqu'à l'envoi du formulaire.

---

## 7. Annexes

### Annexe A : sortie ESLint (`npx eslint .`)

```
warn app/api/contact/route.ts:44            no-unused-vars          'error' is defined but never used
warn app/blog/[slug]/page.tsx:1             no-unused-vars          'Metadata' is defined but never used
ERR  app/blog/[slug]/page.tsx:68 (×2)       no-unescaped-entities   `"`
warn app/cv/page.tsx:3                      no-unused-vars          'useTransform'
warn app/cv/page.tsx:4                      no-unused-vars          'Printer'
warn app/cv/page.tsx:26                     no-unused-vars          'handlePrint'
ERR  app/cv/page.tsx:52 (×2)                no-unescaped-entities   `'`
ERR  app/not-found.tsx:24                   no-unescaped-entities   `'`
warn app/page.tsx:9                         no-unused-vars          'BlogPreview'
warn app/projects/[slug]/page.tsx:4         no-unused-vars          'ExternalLink'
ERR  app/projects/[slug]/page.tsx:218 (×2)  no-unescaped-entities   `"`
warn components/layout/Header.tsx:4         no-unused-vars          'AnimatePresence'
warn components/layout/MobileMenu.tsx:4     no-unused-vars          'cn'
warn components/sections/About.tsx:4        no-unused-vars          'Image'
warn components/sections/About.tsx:13       no-unused-vars          'fadeInLeft', 'fadeInRight'
warn components/sections/About.tsx:16       no-unused-vars          'highlights'
warn components/sections/CircularStack.tsx:4  no-unused-vars        'AnimatePresence'
ERR  components/sections/CircularStack.tsx:133 no-unescaped-entities `'`
warn components/sections/Contact.tsx:8      no-unused-vars          'fadeInUp'
warn components/sections/FlippableCard.tsx:6   no-unused-vars       'cn'
warn components/sections/FlippableCard.tsx:24  no-unused-vars       'handleFlip'
warn components/sections/Hero.tsx:6,10,20,21   no-unused-vars       'Briefcase', 'Typewriter', 'y1', 'y2'
warn components/sections/Portfolio.tsx:5    no-unused-vars          'Github'
warn components/sections/ProcessSection.tsx:4,8 no-unused-vars      'useTransform', 'fadeInUp', 'staggerContainer'
warn components/shared/ConstellationBackground.tsx:12  no-unused-vars  'yOffset'
warn components/shared/ConstellationBackground.tsx:29  react-hooks/unsupported-syntax  inline class
ERR  components/shared/LightboxImage.tsx:25 no-explicit-any
ERR  components/shared/ParallaxImage.tsx:29 no-explicit-any
ERR  components/shared/ReadingProgress.tsx:16  react-hooks/set-state-in-effect
warn components/shared/SpotlightCard.tsx:3  no-unused-vars          'useRef', 'useState'
ERR  components/shared/ThemeToggle.tsx:14   react-hooks/set-state-in-effect
warn data/navigation.ts:1                   no-unused-vars          'NavItem'
warn lib/animations.ts:6                    no-unused-vars          'easeInOut'
✖ 43 problems (12 errors, 31 warnings)
```

### Annexe B : `npm audit` (résumé)

| Sévérité | Paquet | Direct | Correctif |
|---|---|:-:|---|
| 🔴 critique | `next` | oui | `next@16.4.2` |
| 🟠 haute | `postcss`, `sharp` | non (via next) | `next@16.4.2` |
| 🟠 haute | `nanoid`, `source-map-js`, `picomatch`, `minimatch`, `brace-expansion`, `flatted`, `js-yaml`, `browserslist` | non | `npm audit fix` |
| 🟠 haute | `eslint-config-next`, `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, `braces` | dev | mise à jour d'`eslint-config-next` avec Next |
| 🟡 modérée | `resend` (via `svix` → `uuid`), `uuid`, `ajv`, `@humanfs/node`, `baseline-browser-mapping` | partiel | `npm audit fix` |
| ⚪ faible | `@babel/core` | dev | `npm audit fix` |

Total : **23 vulnérabilités** (1 critique, 15 hautes, 6 modérées, 1 faible), dont 9 en dépendances de production.

### Annexe C : contrastes WCAG mesurés

| Combinaison | Ratio | Verdict |
|---|:-:|---|
| Sombre : `secondary` #F59E0B sur fond #111111 | 8,79 | ✅ AA |
| Sombre : `muted` #94A3B8 sur fond | 7,36 | ✅ AA |
| Sombre : `primary-light` #2E7D32 (texte) sur fond | 3,68 | ⚠️ grand texte seulement |
| Sombre : `primary-light` sur `surface` #1A1A1C | 3,39 | ⚠️ grand texte seulement |
| Sombre : `muted-dark` #64748B sur fond | 3,97 | ⚠️ grand texte seulement |
| Sombre : `muted-dark` sur `surface` | 3,65 | ⚠️ grand texte seulement |
| Blanc sur `primary` #1B5E20 | 7,87 | ✅ AA |
| Blanc sur `accent` #DC2626 | 4,83 | ✅ AA |
| Clair : `secondary` #F59E0B sur fond #F8FAFC | **2,05** | ❌ échec |
| Clair : `secondary` sur blanc | **2,15** | ❌ échec |
| Clair : texte #F8FAFC sur bouton `secondary` | **2,05** | ❌ échec |
| Clair : `green-400` (badge Live) sur blanc | **1,74** | ❌ échec |
| Clair : sélection `foreground` sur `primary` | **2,27** | ❌ échec |
| Clair : `primary-light` sur fond | 4,90 | ✅ AA |
| Clair : `muted` #475569 sur fond | 7,24 | ✅ AA |

### Annexe D : statut HTTP des routes (build de production)

| Route | Statut | Remarque |
|---|:-:|---|
| `/` | 200 | 156 Ko HTML |
| `/about`, `/contact`, `/cv`, `/projects` | 200 | |
| `/projects/mimap` (et les 4 autres) | 200 | SSG |
| `/blog/gestion-flotte-reactjs` | 200 | Alors que le blog est « désactivé » |
| `/portfolio` | **404** | Présente dans le sitemap |
| `/blog` | **404** | Présente dans le sitemap |
| `/og-image.jpg` | **404** | Référencée dans les balises OG |
| `/sitemap.xml`, `/robots.txt` | 200 | |

---

## 8. Suivi des corrections

### Phase 1 : terminée le 22 octobre 2026

| # | Action | Statut | Vérification |
|---|---|:-:|---|
| 1 | Next.js 16.1.5 → **16.4.2**, `eslint-config-next` 16.4.2, `resend` 6.34.1, `npm audit fix` | ✅ | `npm audit --omit=dev` : **0 vulnérabilité** en production (contre 9) |
| 2 | Route contact : gestion de `{ data, error }` de Resend, validation **zod** (types, format d'email, longueurs, sujet sur une ligne), variables `CONTACT_TO` / `CONTACT_FROM`, `.env.example` | ✅ | JSON cassé, champ manquant, email invalide, mauvais type → 400 ; clé Resend invalide → **502** (renvoyait 200 avant) |
| 3 | Navigation en `/#section` avec `next/link` (header, menu mobile, footer) ; `aria-expanded` / `aria-controls` sur le bouton du menu | ✅ | Liens `/#…` présents dans le HTML de `/cv` |
| 4 | `PageTransition` supprimé ; header sans `translateY(-100px)` ; texte et photo du Hero sans `opacity:0` initial | ✅ | `<main>` n'est plus enveloppé ; `h1` et photo visibles dès le HTML |
| 5 | Polices : Sora (titres) + DM Sans (texte) + JetBrains Mono, comme prévu par le brief ; `@theme` référence les variables de `next/font` | ✅ | CSS servi : `.font-display{font-family:var(--font-sora),…}` |
| 6 | Statistiques stockées en nombres, suffixe « + » à l'affichage | ✅ | « 18+ » au lieu de « 18++ » |
| 7 | Curseur natif masqué seulement quand `CustomCursor` est monté (souris + animations autorisées) ; curseur texte conservé dans les champs ; `MotionConfig reducedMotion="user"` ; confettis désactivés si animations réduites | ✅ | Plus de `* { cursor:none }` global |
| 8 | Image OG générée (`app/opengraph-image.tsx`, 1200×630) ; sitemap corrigé (sans `/portfolio` ni `/blog`, avec `/projects` et `/cv`, sans fausse date) | ✅ | Image en 200 sur toutes les pages ; les 10 URL du sitemap en 200 |
| 9 | Erreurs ESLint corrigées, imports inutilisés retirés ; motif `setMounted` remplacé par le hook `useHydrated` | ✅ | **0 erreur** (contre 12), 2 avertissements |

**Ajustements liés :**
- `experimental.viewTransition` a été retiré : l'option n'existe plus en Next 16.4, où les View Transitions fonctionnent sans configuration.
- `turbopack.root` a été fixé, ce qui supprime l'avertissement de build sur les lockfiles multiples.

**Restes connus, volontairement reportés :**
- **5 vulnérabilités « high » dans l'outillage de lint** (`eslint-config-next` → `fast-glob` → `micromatch`/`braces`). Elles concernent uniquement le développement et ne sont jamais livrées. Le seul correctif proposé par npm est un retour à `eslint-config-next@14`, ce qui serait incompatible. À revoir à la prochaine version de Next.
- **2 avertissements ESLint** : `handleFlip` sera branché en phase 2 (A-04) ; `yOffset` est dans `ConstellationBackground`, composant mort qui sera supprimé en phase 3 (Q-02).
- **Environ 50 éléments animés au scroll** restent à `opacity:0` dans le HTML serveur. Ils sont tous sous la ligne de flottaison, donc sans effet sur le LCP. Leur sort sera réglé avec la refonte des animations (P-01).
- **Le README référence encore `/public/og-image.jpg`**. Il sera mis à jour en phase 3 (O-03).

### Phase 2 : partie technique terminée le 22 octobre 2026

| # | Action | Statut | Vérification |
|---|---|:-:|---|
| 10 | Expériences avec `id` et `type` (clés uniques, tri formation / expérience) ; CV : métadonnées via un composant serveur, impression fiable, domaine tiré de `siteConfig`, année dynamique, `rel` sur les liens | ✅ | Plus de clé dupliquée ; `/cv` a son propre titre et son canonical |
| 11 | Helper `pageMetadata()` (titre, description, canonical, OG, Twitter) sur toutes les pages ; image de partage par étude de cas ; JSON-LD `Person` | ✅ | Chaque page expose ses propres balises, et son `og:image` répond en 200 |
| 12 | **Blog retiré proprement** (routes, section, données, composants dédiés) | ✅ | `/blog/*` → 404 ; plus aucun `dangerouslySetInnerHTML` dans le contenu |
| 13 | Contenu (chiffres, nouveaux témoignages, liens et études de cas) | ⏳ | **En attente des informations à jour d'Ibrahima** ; champ `linkedin` ajouté aux témoignages ; « Next.js 15 » corrigé en 16 |
| 14 | Thème clair corrigé : variant `dark:` lié à la classe, ambre `#B45309`, token `primary-text`, `muted-dark` éclairci, couleurs codées en dur adaptées, textes sans opacité réductrice | ✅ | Captures pleine page des deux thèmes à 1440 px et 390 px |
| 15 | Menu mobile en dialogue accessible (Échap, piège de focus, scroll bloqué, retour du focus) ; cartes de services utilisables au clavier et au tactile ; actions des projets visibles au focus ; lien d'évitement ; `h1` sur chaque page ; carrousel annoncé, avec des pastilles de 24 px | ✅ | Un `h1` et un `main#main` par page ; 0 erreur ESLint |
| 16 | Honeypot, délai minimal de 3 s, limitation de débit par IP (5 envois / 10 min) | ✅ | Robot → 200 sans envoi ; 6ᵉ envoi depuis la même IP → 429 |

**Corrections hors plan, découvertes pendant la vérification visuelle :**
- `SpotlightCard` était incliné à 15° au repos : la position initiale (0, 0) correspondait à l'inclinaison maximale. Les cartes sont maintenant à plat.
- L'avatar « CABN » débordait du cercle : on n'affiche plus que deux initiales.
- Les confettis du logo sont chargés à la demande (gain sur le JavaScript initial, P-01 partiel).

**Contenu mis à jour à partir du profil fourni (22 octobre 2026) :**
- **C-01 ✅** : statistiques vérifiables (9 projets en production, 2+ ans de pratique, 4 entreprises et startups).
- **C-03 ✅** : 9 projets ont un lien en ligne ; 7 nouveaux projets ont été ajoutés, avec des captures WebP de leurs sites.
- **C-04 (partiel)** : études de cas détaillées pour Tekkil et AgriPont ; les autres projets n'ont qu'une description courte.
- Parcours à jour : Nixacom, Tekkil, AgriPont, Saraya Tech ; Licence ISI terminée avec Mention Bien ; résultats ajoutés (20/20, 17,37/20, 15,67/20).

**Encore en attente :**
- **C-02** : nouveaux témoignages (le champ `linkedin` est prêt).
- **C-04** : détails (stack, rôle, défis) pour Abu Maryam TV, ADSS, SN Immo, Fily Mode Royale et Workspace L&N Entreprise.
- **CV PDF** : `public/cv/Ibrahima-Sory-Diallo-CV_1.pdf` est l'ancienne version, alors que le bouton « Télécharger PDF Original » le propose.
- **SEO-06** : domaine réel de production (`ibrahimadev.com` ?).
- **F-10** : URL Calendly réelle, ou retrait du bouton.

**Restes connus :**
- **1 avertissement ESLint** : `yOffset` dans `ConstellationBackground`, composant mort prévu pour la phase 3.
- **La limitation de débit est en mémoire**, donc propre à chaque instance serverless. Une limite globale demanderait un stockage partagé (Upstash, Vercel KV).

