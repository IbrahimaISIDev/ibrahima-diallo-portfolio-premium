import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = ["", "/about", "/portfolio", "/blog", "/contact"].map(
        (route) => ({
            url: `${siteConfig.url}${route}`,
            lastModified: new Date().toISOString().split("T")[0],
            priority: route === "" ? 1 : 0.8,
        })
    );

    const projectRoutes = projects.map((project) => ({
        url: `${siteConfig.url}/projects/${project.slug}`,
        lastModified: new Date().toISOString().split("T")[0],
        priority: 0.6,
    }));

    const blogRoutes = blogPosts.map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: post.date,
        priority: 0.6,
    }));

    return [...routes, ...projectRoutes, ...blogRoutes];
}
