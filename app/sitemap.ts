import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { projects } from "@/data/projects";

// lastModified est volontairement omis : une date de build fausse est pire qu'aucune date.
export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/about", "/projects", "/cv", "/contact"].map(
        (route) => ({
            url: `${siteConfig.url}${route}`,
            priority: route === "" ? 1 : 0.8,
        })
    );

    const projectRoutes = projects.map((project) => ({
        url: `${siteConfig.url}/projects/${project.slug}`,
        priority: 0.6,
    }));

    return [...routes, ...projectRoutes];
}
