import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import { getPortfolioData } from "../db.js";

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY || "";

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;
    const portfolioData = await getPortfolioData();
    const profile = portfolioData.profile || {
      name: "l'auteur du site",
      title: "",
      bio: "",
      location: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
    };

    if (!apiKey) {
      return res.status(500).json({
        error: "La clé API Gemini n'est pas configurée. Veuillez définir GEMINI_API_KEY dans .env.local.",
      });
    }

    if (apiKey.startsWith("AIza")) {
      console.warn(
        "La clé API Gemini semble incorrecte : une clé 'AIza...' est détectée. Utilisez une clé Gemini valide pour le service generativelanguage.googleapis.com."
      );
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Format des messages invalide." });
    }

    // Convert input messages to the GoogleGenAI contents structure
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const systemInstruction = `Tu es l'assistant IA virtuel du portfolio de ${profile.name || "l'auteur du site"}. Ton rôle est de renseigner chaleureusement et professionnellement les recruteurs, étudiants et visiteurs de son site Portfolio.

Voici les informations disponibles pour ce portfolio :

[Profil]
Nom : ${profile.name || "—"}
Titre : ${profile.title || "—"}
Bio : ${profile.bio || "—"}
Localisation : ${profile.location || "—"}
Email : ${profile.email || "—"}
Téléphone : ${profile.phone || "—"}
LinkedIn : ${profile.linkedin || "—"}
GitHub : ${profile.github || "—"}

Tu peux parler des sections suivantes : éducation, expérience professionnelle, expérience bénévole, projets, compétences, certifications, témoignages et contact.

Directives de conversation :
1. Reste poli, bienveillant, clair, synthétique, professionnel et enthousiaste.
2. Réponds en français (ou dans la langue de l'interlocuteur s'il écrit en anglais, espagnol, etc.).
3. Ne propose JAMAIS d'informations non documentées ici (ne pas inventer d'autres postes ou compétences).
4. Si un visiteur veut le contacter, donne-lui son email ou invite-le à utiliser le formulaire de contact interactif au bas du site.
5. Garde tes réponses relativement concises et adaptées au format de chat.`;

    // Request to Gemini API using modern SDK approach
    const response = await ai.models.generateContent({
              model: "gemini-3.6-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "Désolé, je n'ai pas pu générer de réponse.";
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: error.message || "Erreur interne du serveur lors de la communication avec l'assistant.",
    });
  }
}
