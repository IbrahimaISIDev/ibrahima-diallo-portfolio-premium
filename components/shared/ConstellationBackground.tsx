"use client";

import React, { useEffect, useRef } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";

export default function ConstellationBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const { scrollY } = useScroll();

    // Smooth scroll parallax for the background
    const yOffset = useSpring(useTransform(scrollY, [0, 5000], [0, -200]), {
        damping: 20,
        stiffness: 100,
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 200;
        const connectionDistance = 150;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.size = Math.random() * 2.5 + 1; // Slightly larger particles
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.color = Math.random() > 0.5 ? "#3b82f6" : "#f59e0b";
            }

            update(mouseX: number, mouseY: number) {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around screen
                if (this.x > window.innerWidth) this.x = 0;
                if (this.x < 0) this.x = window.innerWidth;
                if (this.y > window.innerHeight) this.y = 0;
                if (this.y < 0) this.y = window.innerHeight;

                // Mouse reaction (repulsion)
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (150 - distance) / 150;
                    this.x -= forceDirectionX * force * 3;
                    this.y -= forceDirectionY * force * 3;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color + "88"; // Increased transparency (more opaque)
                ctx.fill();
            }
        }

        const init = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mouseRef.current.x, mouseRef.current.y);
                particles[i].draw();

                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        // Increased line opacity from 0.3 to 0.5
                        ctx.strokeStyle = `rgba(59, 130, 246, ${0.5 * (1 - distance / connectionDistance)})`;
                        ctx.lineWidth = 1.5; // Slightly thicker lines
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        init();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-20 h-full w-full pointer-events-none opacity-90 dark:opacity-70"
            style={{ top: 0, left: 0 }}
        />
    );
}
