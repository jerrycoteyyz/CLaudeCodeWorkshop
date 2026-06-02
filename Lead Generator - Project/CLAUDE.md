# CLAUDE.md — Dumb Plumbing Lead Calculator

## About This Project
- **Name**: Dumb Plumbing Lead Calculator
- **Type**: Web App (single-page lead magnet)
- **Primary Tech**: Next.js 14 + Tailwind CSS + Formspree
- **Key Purpose**: Convert plumbing-problem visitors into booked service calls via an interactive cost calculator

## Security
No auth in v1. Formspree form ID goes in `.env.local` only — never hardcoded.

## Before Any Feature Work — Read These First
- **`PRD.md`** — requirements and done checklist
- **`spec/plan.md`** — architecture and build order

## Project Rules for Claude
- **Code style**: TypeScript only, no `var`, functional components only
- **Naming**: PascalCase components, camelCase utils, UPPER_SNAKE_CASE constants
- **Styling**: Tailwind only — no inline styles, no CSS modules
- **State**: `useState` for wizard state — no Redux, no Zustand
- **Estimates**: All price logic lives in `src/lib/estimates.ts` — never hardcoded in components
- **Testing**: Not required for v1
- **Branches**: `feature/*`, `bugfix/*`
- **Critical files (ask before modifying)**: `src/lib/estimates.ts`, `.env.local`

## Future Work (v2)
- Replace Formspree with a Next.js API route + PostgreSQL (Supabase) to store leads
- Lead data shape is already defined in PRD.md — model is ready

## Key Contacts
- **Owner**: Jerry Cote — jerrycote2536@gmail.com
- **Business Phone**: 973-349-7885
