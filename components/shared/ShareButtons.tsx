"use client";

import { Linkedin, Twitter, Link2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            color: "hover:text-[#0077b5]",
        },
        {
            name: "X",
            icon: Twitter,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            color: "hover:text-[#1da1f2]",
        },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-4 py-8 border-y border-border/50">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted">Partager</span>
            <div className="flex gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-secondary/50 ${link.color} hover:shadow-lg`}
                        aria-label={`Partager sur ${link.name}`}
                    >
                        <link.icon size={18} />
                    </a>
                ))}
                <button
                    onClick={copyToClipboard}
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:border-secondary/50 hover:text-foreground hover:shadow-lg"
                    aria-label="Copier le lien"
                >
                    <Link2 size={18} />
                    <AnimatePresence>
                        {copied && (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="absolute -top-10 whitespace-nowrap rounded-lg bg-secondary px-3 py-1 text-xs font-bold text-background shadow-lg"
                            >
                                Copié !
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>
        </div>
    );
}
