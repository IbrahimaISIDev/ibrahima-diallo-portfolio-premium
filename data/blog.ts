export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Comment j'ai construit un système de gestion de flotte avec ReactJS",
    slug: "gestion-flotte-reactjs",
    excerpt:
      "Retour d'expérience sur la conception et le développement d'une application complexe de gestion de flotte automobile pour Saraya Tech.",
    content: `
La gestion d'une flotte automobile est un d&eacute;fi logistique majeur. Pour Saraya Tech, j'ai d&eacute;velopp&eacute; une solution sur mesure utilisant ReactJS qui permet de suivre en temps r&eacute;el l'&eacute;tat des v&eacute;hicules, les maintenances pr&eacute;vues et la consommation de carburant.

### L'Architecture
L'application repose sur une architecture modulaire permettant une grande scalabilit&eacute;. J'ai utilis&eacute; Redux pour la gestion d'&eacute;tat globale, assurant une synchronisation parfaite entre les diff&eacute;rents tableaux de bord.

### D&eacute;fis Techniques
L'un des plus grands d&eacute;fis a &eacute;t&eacute; l'int&eacute;gration des donn&eacute;es de g&eacute;olocalisation en direct. Gr&acirc;ce &agrave; l'utilisation de WebSockets, nous avons pu r&eacute;duire la latence de mise &agrave; jour &agrave; moins de 500ms.

### R&eacute;sultats
Aujourd'hui, l'outil est utilis&eacute; quotidiennement et a permis une r&eacute;duction de 15% des co&ucirc;ts de maintenance gr&acirc;ce &agrave; une planification plus proactive.
    `,
    category: "Retour d'expérience",
    date: "2025-01-15",
    readTime: "8 min",
  },
  {
    title: "Guide : Déployer une app Flutter avec CI/CD",
    slug: "deployer-flutter-cicd",
    excerpt:
      "Un guide complet pour automatiser le déploiement de vos applications Flutter avec GitHub Actions et CodeMagic.",
    content: `
L'automatisation est la cl&eacute; de la productivit&eacute; pour tout d&eacute;veloppeur mobile. Dans ce guide, nous explorons comment mettre en place un pipeline CI/CD robuste pour Flutter.

### Pourquoi le CI/CD ?
Le CI/CD permet de d&eacute;tecter les erreurs t&ocirc;t et d'assurer que chaque version envoy&eacute;e aux testeurs ou sur les stores est stable.

### GitHub Actions
GitHub Actions est un outil puissant pour automatiser vos workflows. Nous configurons des scripts pour lancer les tests unitaires et builder l'APK/IPA &agrave; chaque push sur la branche principale.

### Conclusion
La mise en place initiale peut prendre du temps, mais le gain de temps sur le long terme est inestimable.
    `,
    category: "Tutoriel",
    date: "2025-01-08",
    readTime: "12 min",
  },
  {
    title: "De Sonatel Academy à Saraya Tech : Mon parcours de développeur",
    slug: "parcours-developpeur-senegal",
    excerpt:
      "Mon parcours de développeur au Sénégal, de la formation intensive à Sonatel Academy jusqu'à mon rôle actuel chez Saraya Tech.",
    content: `
Le d&eacute;veloppement web au S&eacute;n&eacute;gal est en pleine effervescence. Mon parcours a commenc&eacute; par une immersion totale &agrave; la Sonatel Academy.

### Sonatel Academy : Le Tremplin
Cette formation intensive m'a permis d'acqu&eacute;rir des bases solides en JavaScript et en r&eacute;solution de probl&egrave;mes complexes. L'ambiance d'apprentissage collaboratif y est exceptionnelle.

### L'Arriv&eacute;e chez Saraya Tech
Rejoindre Saraya Tech a &eacute;t&eacute; une &eacute;tape d&eacute;cisive. J'y ai appris l'importance de la rigueur professionnelle et du travail en &eacute;quipe sur des projets d'envergure nationale.

### Vision
Mon objectif est de continuer &agrave; contribuer au d&eacute;veloppement technologique de notre pays en cr&eacute;ant des solutions innovantes.
    `,
    category: "Parcours",
    date: "2024-12-20",
    readTime: "6 min",
  },
];
