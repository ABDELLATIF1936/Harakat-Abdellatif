# Vercel Deployment Refactor - Task List

## ✅ Step 1: Fix db.ts — Make Serverless-Compatible
- [x] Wrap filesystem operations (fs.existsSync, fs.unlinkSync) in try-catch
- [x] Make dotenv.config() graceful when .env is missing (serverless env)
- [x] Ensure pool initialization handles missing env vars gracefully at import time
- [x] Lazy initialization pattern: all exported functions call `ensureInitialized()` first
- [x] No more top-level throws on import — errors happen on first function call only

## ✅ Step 2: Fix server.ts — Local Dev Only
- [x] Add try-catch around dotenv.config() for robustness
- [x] Keep app.listen() for local development (not deployed to Vercel)
- [x] No other changes — this file is NOT used on Vercel

## ✅ Step 3: Rewrite vercel.json — Complete Vercel Config
- [x] Add SPA rewrites so client-side routing works (all non-API routes → /index.html)
- [x] Clean up env block (env vars are set in Vercel Dashboard)
- [x] Keep function runtime config (nodejs20.x)

## ✅ Step 4: Verify package.json
- [x] Ensure `npm run dev`, `npm run build` scripts are correct
- [x] Ensure @vercel/node is in devDependencies
- [x] No breaking changes

## ✅ Step 5: Fix api/chat.ts — Invalid Gemini Model
- [x] Changed `gemini-3.5-flash` → `gemini-2.0-flash` (valid model name)

## ✅ Step 6: Verify Build
- [x] `npm run build` — builds successfully (3m 39s)
  - `dist/index.html` — 0.42 kB
  - `dist/assets/index-BOti7oYc.css` — 81.02 kB
  - `dist/assets/index-DK0FsMs4.js` — 526.78 kB
- [ ] Deploy to Vercel via `npx vercel --prod` or Git integration
