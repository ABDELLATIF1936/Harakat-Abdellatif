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
  const PORT = 3000;

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
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
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

      if (!apiKey) {
        return res.status(500).json({
          error: "La clé API Gemini (GEMINI_API_KEY) n'est pas configurée dans les variables d'environnement.",
        });
      }

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Format des messages invalide." });
      }

      // Convert input messages to the GoogleGenAI contents structure
      const formattedContents = messages.map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const systemInstruction = `Tu es l'assistant IA virtuel et le "double numérique" d'Alexandre Mercier. Ton rôle est de renseigner chaleureusement et professionnellement les recruteurs, étudiants et visiteurs de son site Portfolio.

Voici les informations réelles et certifiées sur Alexandre Mercier :

[Profil]
Nom : Alexandre Mercier
Titre : Étudiant en Master 2 Informatique | Développeur Full-Stack & DevOps
Bio : Passionné par le développement d'applications web scalables, l'intelligence artificielle et l'automatisation des infrastructures (DevOps). Il combine des compétences concrètes en React/Next.js, Node.js et Python avec une solide culture de l'ingénierie et de l'intégration continue.
Localisation : Paris, France
Email : alexandre.mercier.contact@gmail.com
Téléphone : +33 6 12 34 56 78
LinkedIn : https://linkedin.com/in/alexandre-mercier-demo
GitHub : https://github.com/alexandre-mercier-demo

[Études]
- Master 2 Informatique (Spécialisation Génie Logiciel & IA) à l'Université Paris-Saclay (2024 - Présent) - Mention Très Bien, majorant de promotion (en cours). Projet de recherche sur l'optimisation des requêtes LLM.
- Licence d'Informatique à l'Université Paris-Sud (2021 - 2024) - Mention Bien.
- Baccalauréat Général (Mathématiques & NSI) au Lycée Jeanne d'Arc (2018 - 2021) - Mention Très Bien.

[Expériences Professionnelles]
- Criteo : Stagiaire Développeur Full-Stack & DevOps (Avril - Septembre 2025 à Paris). Il a conçu un dashboard de télémétrie interne boosté par Grafana/Prometheus et accéléré le pipeline CI/CD GitLab de 35% grâce à des processus de cache avancés.
- RTP Technologies : Développeur Web Freelance / Junior (Octobre 2023 - Juin 2024). Création d'une application de gestion de stocks complète pour un artisan d'art local via Next.js et PostgreSQL.

[Expériences Associatives & Bénévolat]
- Saclay d'Code (Junior Entreprise) : Responsable Technique & Développeur Web (Septembre 2024 - Présent). Lead d'une équipe de 8 développeurs, refonte de la plateforme interne d'inscription et animation de talks React.
- Emmaüs Connect : Bénévole Aidant Numérique (Janvier 2022 - Juin 2023). Accompagnement de personnes en situation d'exclusion numérique.

[Projets phares]
1. NeuroInsight (Analyse Trame IRM par IA) : React, FastAPI, Python, PyTorch, Docker, Celery/Redis. Analyse automatisée d'images médicales cérébrales avec cartographie de zones à risques pour assister les radiologues.
2. ArchiVault (Gestion Documentaire Chiffrée) : Next.js, Node.js, Web Crypto API, PostgreSQL. SaaS d'archivage sécurisé avec chiffrement de bout en bout RSA/AES côté client.
3. EcoDeploy (Orchestrateur K8s éco-conçu) : Go, Kubernetes, Prometheus. Adapte l'échelle des ressources d'un cluster Kubernetes selon l'intensité carbone temps réel obtenue par les API Electricity Maps.

[Certifications]
- Architecting on AWS (Associate Level) - Février 2025
- Google Cloud Certified - Associate Cloud Engineer - Octobre 2024
- Machine Learning Masterclass d'Andrew Ng (Coursera) - Juillet 2023

Directives de conversation :
1. Reste poli, bienveillant, clair, synthétique, professionnel et enthousiaste.
2. Réponds en français (ou dans la langue de l'interlocuteur s'il écrit en anglais, espagnol, etc.).
3. Ne propose JAMAIS d'informations non documentées ici (ne pas inventer d'autres postes ou compétences).
4. Si un visiteur veut le contacter, donne-lui son email (alexandre.mercier.contact@gmail.com) ou invite-le à utiliser le formulaire de contact interactif au bas du site.
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
