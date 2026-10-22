# Portfolio d'Ibrahima Sory Diallo

Portfolio de développeur Full-Stack basé à Dakar : parcours, compétences, projets en production, CV interactif et formulaire de contact. Identité visuelle « Premium Sénégal » : vert profond, or et rouge sur fond obsidienne, en thème sombre et clair.

**Site en ligne : [ibrahima-devs-portfolio.vercel.app](https://ibrahima-devs-portfolio.vercel.app)**

![Aperçu de la page d'accueil](docs/apercu.webp)

---

## Fonctionnalités

- **Accueil** : présentation, services, statistiques, parcours, processus de travail, projets filtrables par catégorie, témoignages et contact.
- **Études de cas** (`/projects/[slug]`) : architecture, défis techniques et lien vers le site en ligne, avec une image de partage générée pour chaque projet.
- **CV interactif** (`/cv`) : version web imprimable et PDF à télécharger.
- **Formulaire de contact** : envoi par [Resend](https://resend.com), validation des champs, protection anti-spam (champ piège, délai minimal, limitation de débit par IP).
- **Thème sombre / clair**, contrastes conformes WCAG AA.
- **Accessibilité** : navigation au clavier, lien d'évitement, menu mobile accessible, respect de « réduire les animations ».
- **SEO** : métadonnées et URL canonique par page, images Open Graph générées, sitemap, robots.txt, données structurées `Person`.

## Stack

| Couche | Technologies |
| :--- | :--- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript 5 |
| Style | Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Formulaire | Resend, Zod 4 |
| Tests | Vitest (unitaires), Playwright (de bout en bout) |
| Qualité | ESLint, Prettier, GitHub Actions, Dependabot |

## Démarrage

Prérequis : Node.js 20.9 ou plus.

```bash
git clone https://github.com/IbrahimaISIDev/ibrahima-diallo-portfolio-premium.git
cd ibrahima-diallo-portfolio-premium
npm install
cp .env.example .env.local   # puis renseigner les variables
npm run dev                   # http://localhost:3000
```

### Variables d'environnement

| Variable | Rôle |
| :--- | :--- |
| `RESEND_API_KEY` | Clé API Resend, **obligatoire** pour que le formulaire envoie des emails |
| `CONTACT_TO` | Adresse qui reçoit les messages (par défaut : l'email de `data/personal.ts`) |
| `CONTACT_FROM` | Expéditeur, sur un domaine vérifié dans Resend (par défaut : l'adresse de test `onboarding@resend.dev`, qui ne délivre qu'au propriétaire du compte) |

## Scripts

| Commande | Rôle |
| :--- | :--- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm start` | Build et serveur de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript |
| `npm run format` / `npm run format:check` | Formatage Prettier |
| `npm test` | Tests unitaires (route de contact) |
| `npm run test:e2e` | Tests de bout en bout sur le build de production (lancer `npm run build` avant ; en local, `CHROME_PATH` permet d'utiliser le Chrome installé) |

## Modifier le contenu

Tout le contenu éditorial se trouve dans `data/` : pas besoin de toucher aux composants.

| Fichier | Contenu |
| :--- | :--- |
| `data/personal.ts` | Identité, contact, réseaux, résumé, statistiques, distinctions du CV |
| `data/experience.ts` | Parcours professionnel et formation (`type: "work"` ou `"education"`) |
| `data/projects.ts` | Projets et études de cas ; les filtres du portfolio en sont déduits |
| `data/skills.ts` | Compétences, groupées par domaine |
| `data/services.ts` | Services proposés |
| `data/testimonials.ts` | Témoignages (lien LinkedIn optionnel par auteur) |
| `data/workflow.ts` | Étapes du processus de travail |
| `public/images/` | Photo de profil et captures des projets (WebP recommandé) |
| `public/cv/` | CV au format PDF |

## Structure

```
app/          Pages (App Router), route API de contact, images de partage, icônes, sitemap
components/   layout/ (header, menu, footer), sections/ (accueil), shared/ (composants réutilisables)
data/         Contenu éditorial
lib/          Configuration du site, métadonnées, animations, utilitaires
types/        Types TypeScript du contenu
tests/        unit/ (Vitest) et e2e/ (Playwright)
docs/         Rapport d'audit et brief initial du projet
```

## Qualité et déploiement

Chaque push sur `main` et chaque pull request lancent la CI GitHub Actions : lint, formatage, types, tests unitaires, build, tests de bout en bout et audit des dépendances de production. Dependabot propose les mises à jour chaque semaine.

Le site se déploie sur [Vercel](https://vercel.com) sans configuration particulière : il suffit de renseigner les variables d'environnement ci-dessus dans le projet Vercel.

## Documentation

- [`docs/AUDIT.md`](docs/AUDIT.md) : audit complet du projet (66 constats, plan d'action en trois phases et suivi des corrections).
- [`docs/brief-initial.md`](docs/brief-initial.md) : brief de conception d'origine (objectifs, cibles, direction artistique).

---

## Contact

**Ibrahima Sory Diallo**  
📍 Dakar, Sénégal 🇸🇳  
📧 [ibrahimadev6@gmail.com](mailto:ibrahimadev6@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/ibrahima-sory-diallo-363069249)  
💻 [GitHub](https://github.com/IbrahimaISIDev)

---

Developed with ❤️ by [Ibrahima Sory Diallo](https://github.com/IbrahimaISIDev)
