# PROGRESS.md

> Tracks what's done, in progress, and next for this project.
> Updated by Claude at the start and end of every autonomous build session.
> Format: `[x]` = Done · `[~]` = In Progress · `[ ]` = Not Started

---

## Infrastructure & Setup

- [x] Project scaffold — CLAUDE.md, PRD.md, plan.md, SECURITY.md, .env.example, .gitignore
- [x] Build step — `build.js` generates `config.js` from env vars
- [x] Vercel deployment config — `vercel.json`, `.vercel/` linked
- [x] Pre-commit safety hook — blocks .env commits, secret patterns, failed builds
- [ ] Fill in CLAUDE.md, PRD.md, plan.md — replace `[placeholder]` text with actual project details
- [ ] Add `package.json` with npm scripts (`build`, `test`, `lint`)
- [ ] Add test runner (Vitest recommended for plain JS projects)
- [ ] Add ESLint for JavaScript linting
- [ ] Add Prettier for consistent formatting

---

## App Features — Stock Tracker

- [x] Live stock price display — ticker symbol, current price, delta
- [x] Candlestick/line chart — rendered on `<canvas>` via `chart.js`
- [x] Env-driven ticker config — `TICKER_SYMBOL` from `.env`
- [ ] _(Fill in planned features from PRD.md once completed)_

---

## Session Log

| Date       | Task                              | Outcome                                                                 |
| ---------- | --------------------------------- | ----------------------------------------------------------------------- |
| 2026-06-04 | Lesson 9 — autonomous build setup | Added Autonomous Build Rules to CLAUDE.md, pre-commit hook, PROGRESS.md |
