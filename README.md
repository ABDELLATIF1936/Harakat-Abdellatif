<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a73550c4-0f75-44f8-920c-235393f55a3c

## Run Locally

**Prerequisites:** Node.js, MySQL Server

**Important:** This application requires MySQL. There is no local file fallback.

1. Install dependencies:
   `npm install`
2. Start your MySQL server (e.g., via XAMPP control panel)
3. Create a local environment file from the example:
   `cp .env.example .env.local`
4. Configure MySQL in `.env.local`:
   - `MYSQL_HOST=localhost` (or your server IP)
   - `MYSQL_PORT=3306`
   - `MYSQL_USER=root`
   - `MYSQL_PASSWORD=` (your MySQL password)
   - `MYSQL_DATABASE=portfolio_db`
5. Set the required Gemini API key:
   - `GEMINI_API_KEY="your_gemini_api_key"`
6. Run the app:
   `npm run dev`

**Note:** Tables will be created automatically on first run if the database exists.
