# CLAUDE.md

## Project Overview
**[Project Name]** — [One sentence: What does this project do?]

## Tech Stack
- Frontend: [React / Next.js / plain HTML / Other]
- Backend: [Node.js / Next.js API routes / Python / Other]
- Database: [Supabase / Postgres / SQLite / None]
- Hosting: [Vercel / Railway / Other]

## Coding Style
- Language: TypeScript
- Indentation: 2 spaces
- Modules: ES modules (import/export) — not CommonJS
- Async: async/await — no .then() chains
- Naming: descriptive; single letters only for loop counters
- Comments: only when the WHY is non-obvious — never restate the WHAT

## Rules
- Read PRD.md before starting any feature — it is the source of truth
- Never add features outside the current request
- Never hardcode API keys or secrets — use .env
- .env must be in .gitignore before first commit
- Ask when intent is ambiguous — do not guess
- State the next action in one sentence before executing

## Definition of Done
1. Behavior matches the request
2. No console or terminal errors
3. Tests pass (if any exist)
4. /review passes
5. Changes committed via /commit
