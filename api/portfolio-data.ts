import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPortfolioData, savePortfolioData } from "../db";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle GET /api/portfolio-data
  if (req.method === "GET") {
    try {
      const data = await getPortfolioData();
      return res.status(200).json(data);
    } catch (error: any) {
      console.error("Error fetching portfolio database data:", error);
      return res.status(500).json({
        error: error.message || "Erreur serveur lors de la récupération des données",
      });
    }
  }

  // Handle POST /api/portfolio-data/update
  if (req.method === "POST") {
    try {
      console.log("Received POST /api/portfolio-data/update", { body: req.body });
      const result = await savePortfolioData(req.body);
      console.log("savePortfolioData result:", result);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error("Error performing portfolio database update:", error);
      return res.status(500).json({
        error: error.message || "Erreur serveur lors de la sauvegarde",
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
