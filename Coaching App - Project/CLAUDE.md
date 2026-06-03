# CLAUDE.md

## Project Overview
A single-page web app that displays a random motivational quote every time the browser is refreshed.

## Tech Stack
- Frontend: Next.js
- Backend: Next.js API routes
- Database: Supabase
- Hosting: Vercel

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
