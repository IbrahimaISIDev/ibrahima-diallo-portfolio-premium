import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { personalInfo } from "@/data/personal";

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

const CONTACT_TO = process.env.CONTACT_TO ?? personalInfo.email;
const CONTACT_FROM =
    process.env.CONTACT_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

// Retire les retours à la ligne pour éviter toute injection dans le sujet
const singleLine = (max: number) =>
    z
        .string()
        .trim()
        .min(1)
        .max(max)
        .transform((value) => value.replace(/[\r\n]+/g, " "));

const contactSchema = z.object({
    name: singleLine(100),
    email: z.email().max(254),
    subject: singleLine(150),
    message: z.string().trim().min(1).max(5000),
    // Anti-spam : champ piège invisible (doit rester vide) et heure d'affichage du formulaire
    website: z.string().optional(),
    startedAt: z.number().optional(),
});

// Un humain met plus de 3 secondes à remplir le formulaire
const MIN_FILL_TIME_MS = 3_000;

// Limitation de débit en mémoire : 5 envois par IP toutes les 10 minutes.
// Sur un hébergement serverless, chaque instance a sa propre mémoire : c'est un
// garde-fou contre les rafales, pas une limite globale (voir docs/AUDIT.md, S-03).
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const submissions = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string) {
    const now = Date.now();
    for (const [key, entry] of submissions) {
        if (entry.resetAt <= now) submissions.delete(key);
    }

    const entry = submissions.get(ip);
    if (!entry) {
        submissions.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
        return false;
    }
    entry.count += 1;
    return entry.count > RATE_LIMIT;
}

export async function POST(req: Request) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            { error: "Merci de remplir correctement tous les champs" },
            { status: 400 }
        );
    }

    // Robot détecté : on simule un succès pour ne pas l'aider à contourner le filtre
    const { website, startedAt } = parsed.data;
    const filledTooFast =
        startedAt !== undefined && Date.now() - startedAt < MIN_FILL_TIME_MS;
    if (website || filledTooFast) {
        return NextResponse.json({ id: null });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Trop de messages envoyés, réessayez dans quelques minutes" },
            { status: 429 }
        );
    }

    if (!resend) {
        console.error("Resend API key is missing");
        return NextResponse.json(
            { error: "Le service d'envoi d'emails n'est pas configuré" },
            { status: 500 }
        );
    }

    const { name, email, subject, message } = parsed.data;

    try {
        // Resend ne lève pas d'exception en cas d'échec : il renvoie { data, error }
        const { data, error } = await resend.emails.send({
            from: CONTACT_FROM,
            to: [CONTACT_TO],
            subject: `[Portfolio] Nouveau message de ${name}: ${subject}`,
            replyTo: email,
            text: `Nom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
        });

        if (error || !data) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Erreur lors de l'envoi du message" },
                { status: 502 }
            );
        }

        return NextResponse.json({ id: data.id });
    } catch (error) {
        console.error("Contact route error:", error);
        return NextResponse.json(
            { error: "Erreur lors de l'envoi du message" },
            { status: 500 }
        );
    }
}
