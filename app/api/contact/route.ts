import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Tous les champs sont requis" },
                { status: 400 }
            );
        }

        if (!resend) {
            console.error("Resend API key is missing");
            return NextResponse.json(
                { error: "Le service d'envoi d'emails n'est pas configuré" },
                { status: 500 }
            );
        }

        const data = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["ibrahimadev6@gmail.com"], // Votre email personnel
            subject: `[Portfolio] Nouveau message de ${name}: ${subject}`,
            replyTo: email,
            text: `
        Nom: ${name}
        Email: ${email}
        Sujet: ${subject}
        
        Message:
        ${message}
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur lors de l'envoi du message" },
            { status: 500 }
        );
    }
}
