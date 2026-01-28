import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";
import ReadingProgress from "@/components/shared/ReadingProgress";
import ShareButtons from "@/components/shared/ShareButtons";
import { siteConfig } from "@/lib/constants";

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) notFound();

    const postIndex = blogPosts.findIndex((p) => p.slug === slug);
    const nextPost = blogPosts[(postIndex + 1) % blogPosts.length];
    const prevPost =
        blogPosts[(postIndex - 1 + blogPosts.length) % blogPosts.length];

    return (
        <main className="pt-20 bg-background min-h-screen">
            <ReadingProgress />
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-[100px]" />
            </div>

            <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Back button */}
                <Link
                    href="/#blog"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-secondary"
                >
                    <ArrowLeft size={16} />
                    Retour au blog
                </Link>

                {/* Header */}
                <header className="mb-12 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                        <span className="rounded-full bg-secondary/10 px-4 py-1.5 font-semibold uppercase tracking-widest">
                            {post.category}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1.5 text-muted">
                            <Clock size={14} />
                            {post.readTime} de lecture
                        </span>
                    </div>

                    <h1 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-6xl">
                        {post.title}
                    </h1>

                    <p className="text-xl leading-relaxed text-muted border-l-4 border-secondary/30 pl-6 italic">
                        "{post.excerpt}"
                    </p>
                </header>

                {/* Hero Image placeholder */}
                <div className="mb-16 relative aspect-video overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface to-surface-light shadow-2xl">
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Tag size={120} className="text-secondary" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                {/* Post Content */}
                <div className="prose prose-invert prose-lg max-w-none mb-12">
                    <div
                        className="text-muted leading-loose space-y-6 text-lg"
                        dangerouslySetInnerHTML={{ __html: post.content.trim().replace(/\n/g, '<br/>') }}
                    />
                </div>

                <ShareButtons
                    url={`${siteConfig.url}/blog/${post.slug}`}
                    title={post.title}
                />

                {/* Navigation between posts */}
                <nav className="mt-20 grid gap-6 border-t border-border pt-12 sm:grid-cols-2">
                    <Link
                        href={`/blog/${prevPost.slug}`}
                        className="group rounded-2xl border border-border bg-surface p-8 transition-all duration-300 hover:border-secondary/50 hover:shadow-xl"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-secondary transition-colors">
                            Article pr&eacute;c&eacute;dent
                        </span>
                        <p className="mt-3 font-display text-lg font-bold text-foreground line-clamp-2">
                            {prevPost.title}
                        </p>
                    </Link>
                    <Link
                        href={`/blog/${nextPost.slug}`}
                        className="group rounded-2xl border border-border bg-surface p-8 text-right transition-all duration-300 hover:border-secondary/50 hover:shadow-xl"
                    >
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-secondary transition-colors">
                            Article suivant
                        </span>
                        <p className="mt-3 font-display text-lg font-bold text-foreground line-clamp-2">
                            {nextPost.title}
                        </p>
                    </Link>
                </nav>
            </article>
        </main>
    );
}
