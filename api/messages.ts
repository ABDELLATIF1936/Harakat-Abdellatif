import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getContactMessages, saveContactMessages } from "../db";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle GET /api/messages - Fetch all contact messages
  if (req.method === "GET") {
    try {
      const messages = await getContactMessages();
      return res.status(200).json(messages);
    } catch (error: any) {
      console.error("Error fetching message logs from database:", error);
      return res.status(500).json({
        error: error.message || "Erreur serveur lors de la récupération de la messagerie",
      });
    }
  }

  // Handle POST /api/messages - Create new contact message
  if (req.method === "POST") {
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
      return res.status(200).json({ success: true, message: newMsg });
    } catch (error: any) {
      console.error("Error creating new contact message submission:", error);
      return res.status(500).json({
        error: error.message || "Erreur serveur lors de la soumission de votre message",
      });
    }
  }

  // Handle PUT /api/messages - Update messages list (read status, archived, replied state)
  if (req.method === "PUT") {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Liste de messages requise et incorrecte." });
      }

      await saveContactMessages(messages);
      return res.status(200).json({ success: true, count: messages.length });
    } catch (error: any) {
      console.error("Error performing updates on messages list:", error);
      return res.status(500).json({
        error: error.message || "Erreur serveur lors de la mise à jour des messages",
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
