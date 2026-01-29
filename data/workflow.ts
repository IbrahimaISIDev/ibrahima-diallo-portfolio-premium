import { WorkflowStep } from "@/types";

export const workflowSteps: WorkflowStep[] = [
    {
        title: "Discovery",
        subtitle: "Analyse du besoin",
        description:
            "La première étape consiste à comprendre vos objectifs, vos utilisateurs et les défis techniques. C'est ici que nous définissons le périmètre du projet.",
        icon: "Search",
        tasks: [
            "Étude de faisabilité technique",
            "Analyse de la concurrence",
            "Définition des User Stories",
            "Choix de la Stack technologique"
        ]
    },
    {
        title: "Architecture",
        subtitle: "Design technique",
        description:
            "Je conçois une architecture robuste et scalable. L'objectif est de garantir la performance, la sécurité et la maintenabilité à long terme.",
        icon: "Layers",
        tasks: [
            "Schéma de base de données",
            "Design de l'API & Endpoints",
            "Maquettes haute fidélité (UI/UX)",
            "Planification des sprints"
        ]
    },
    {
        title: "Development",
        subtitle: "Sprint agile",
        description:
            "Le code prend vie. J'utilise des méthodes agiles pour livrer des fonctionnalités incrémentales tout en maintenant une qualité de code irréprochable.",
        icon: "Code2",
        tasks: [
            "Développement Frontend & Backend",
            "Tests Unitaires & Intégration",
            "Revue de code & Optimisations",
            "Synchronisation continue (CI/CD)"
        ]
    },
    {
        title: "QA & Launch",
        subtitle: "Optimisation & Mise en ligne",
        description:
            "Après des tests rigoureux, le projet est déployé. Je m'assure que tout est optimisé pour la vitesse et prêt à scale dès le premier jour.",
        icon: "Rocket",
        tasks: [
            "Optimisation SEO & Performance",
            "Tests de montée en charge",
            "Déploiement sur serveur (Vercel/Docker)",
            "Maintenance & Support Post-Lancement"
        ]
    }
];
