# CLAUDE.md

## Project Overview
**Heads Up Texas Hold'Em** — A browser-based heads-up poker game where a human plays Texas Hold'Em against a beginner AI, with escalating blinds, a 15-second decision timer, and auto-deal between hands.

## Tech Stack
- Frontend: Next.js (App Router), React, TypeScript
- Backend: None (client-side only)
- Database: None now — persistence stub at `src/lib/persistence.ts` ready for Supabase
- Hosting: Vercel (now), AWS-compatible build output

## Coding Style
- Language: TypeScript
- Indentation: 2 spaces
- Modules: ES modules (import/export) — not CommonJS
- Async: async/await — no .then() chains
- Naming: descriptive; single letters only for loop counters
- Comments: only when the WHY is non-obvious — never restate the WHAT

## Architecture Rules
- Game logic lives in `src/lib/` as pure TypeScript — no React imports
- React components in `src/components/` handle display only
- AI is always accessed through the `AIPlayer` interface in `src/lib/ai/types.ts`
- All game events pass through `src/lib/persistence.ts` — even as no-ops
- No Vercel-specific APIs (Edge Runtime, KV, Blob) — keep the build portable

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
