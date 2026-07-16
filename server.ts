import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import {
  initializeDatabase,
  getPortfolioData,
  savePortfolioData,
  getContactMessages,
  saveContactMessages,
  getDBStatus,
} from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Initialize relational SQL / MySQL Database
  try {
    await initializeDatabase();
    console.log("Database subsystem initialized.");
  } catch (err) {
    console.error("Critical: Database subsystem initialization failed:", err);
  }

  // Middleware for parsing JSON requests
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Initialize Gemini API client on the server securely
  const apiKey = process.env.GEMINI_API_KEY || "";
  const apiKeyEnvName = "GEMINI_API_KEY";

  if (apiKey) {
    console.log(`Gemini API key loaded from ${apiKeyEnvName}`);
  } else {
    console.error("Gemini API Error on server: missing GEMINI_API_KEY.");
  }

  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API endpoint for portfolio assistant chat
  app.post("/api/chat", async (req, res) => {
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
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Désolé, je n'ai pas pu générer de réponse.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error on server:", error);
      res.status(500).json({ error: error.message || "Erreur interne du serveur lors de la communication avec l'assistant." });
    }
  });

  // ========== DATABASE APIS FOR PORTFOLIO SECTIONS ==========

  // 1. GET all portfolio data (Profile, Education, Experiences, Projects, Certificates, etc.) from live DB
  app.get("/api/portfolio-data", async (req, res) => {
    try {
      const data = await getPortfolioData();
      res.json(data);
    } catch (error: any) {
      console.error("Error fetching portfolio database data:", error);
      res.status(500).json({ error: error.message || "Erreur serveur lors de la récupération des données" });
    }
  });

  // 1b. GET database status
  app.get("/api/db-status", (req, res) => {
    const status = getDBStatus();
    res.json(status);
  });

  // 2. POST update database tables dynamically
  app.post("/api/portfolio-data/update", async (req, res) => {
    try {
      const result = await savePortfolioData(req.body);
      res.json(result);
    } catch (error: any) {
      console.error("Error performing portfolio database update:", error);
      res.status(500).json({ error: error.message || "Erreur serveur lors de la sauvegarde" });
    }
  });

  // 3. GET all message log inquiries
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await getContactMessages();
      res.json(messages);
    } catch (error: any) {
      console.error("Error fetching message logs from database:", error);
      res.status(500).json({ error: error.message || "Erreur serveur lors de la récupération de la messagerie" });
    }
  });

  // 4. POST new incoming message submit
  app.post("/api/messages", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Nom, e-mail et message sont requis." });
      }

      const currentList = await getContactMessages();
      const newMsg = {
        id: `msg-${Date.now()}`,
        name,
        email,
        subject: subject || "Aucun sujet",
        message,
        date: new Date().toISOString(),
        read: false,
        status: "new" as const,
      };

      const updatedList = [newMsg, ...currentList];
      await saveContactMessages(updatedList);
      res.json({ success: true, message: newMsg });
    } catch (error: any) {
      console.error("Error creating new contact message submission:", error);
      res.status(500).json({ error: error.message || "Erreur serveur lors de la soumission de votre message" });
    }
  });

  // 5. PUT bulk messages list status (read status, archived, replied state synchronization)
  app.put("/api/messages", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Liste de messages requise et incorrecte." });
      }

      await saveContactMessages(messages);
      res.json({ success: true, count: messages.length });
    } catch (error: any) {
      console.error("Error performing updates on messages list:", error);
      res.status(500).json({ error: error.message || "Erreur serveur lors de la mise à jour des messages" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
