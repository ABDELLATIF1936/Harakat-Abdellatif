/**
 * LOCAL DEVELOPMENT SERVER ONLY
 * This file is used for local development with Vite middleware.
 * On Vercel, serverless functions in /api directory handle all requests.
 * This file should NOT be used in production.
 */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { initializeDatabase } from "./db";

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

  // Import API route handlers (same logic as serverless functions)
  const { default: chatHandler } = await import("./api/chat");
  const { default: portfolioDataHandler } = await import("./api/portfolio-data");
  const { default: messagesHandler } = await import("./api/messages");
  const { default: dbStatusHandler } = await import("./api/db-status");

  // Mount API routes - use the same handler functions as Vercel serverless
  app.post("/api/chat", (req, res) => chatHandler(req, res));
  app.get("/api/portfolio-data", (req, res) => portfolioDataHandler(req, res));
  app.post("/api/portfolio-data/update", (req, res) => portfolioDataHandler(req, res));
  app.get("/api/messages", (req, res) => messagesHandler(req, res));
  app.post("/api/messages", (req, res) => messagesHandler(req, res));
  app.put("/api/messages", (req, res) => messagesHandler(req, res));
  app.get("/api/db-status", (req, res) => dbStatusHandler(req, res));

  // Vite Integration for local development (hot reload, etc.)
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  // Fallback to index.html for SPA routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `\n✅ Development server running at http://localhost:${PORT}`
    );
    console.log(`📝 API routes are proxied through serverless functions`);
    console.log(`🔄 Frontend hot reload enabled with Vite\n`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
