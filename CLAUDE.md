# CLAUDE.md

## Project Overview
A web app that lets coaches log session notes, track client milestones, and share progress summaries — replacing scattered spreadsheets and notes apps.

## Tech Stack
- Frontend: TBD (React or Next.js recommended)
- Backend: TBD (Node.js / Next.js API routes recommended)
- Database: TBD (Supabase or Postgres recommended)
- Hosting: TBD (Vercel recommended)

## Coding Style
- Language: TypeScript
- Indentation: 2 spaces
- Modules: ES modules (import/export)
- Async: async/await — no .then() chains
- Naming: descriptive; single letters only for loop counters
- Comments: only when the WHY is non-obvious

## Rules
- Read PRD.md before starting any feature — it is the source of truth
- Never add features outside the current request
- Never hardcode API keys or secrets — use .env
- .env must be in .gitignore before first commit
- Ask when intent is ambiguous — do not guess

## Definition of Done
1. Behavior matches the request
2. No console or terminal errors
3. Tests pass (if any exist)
4. /review passes
5. Changes committed via /commit
