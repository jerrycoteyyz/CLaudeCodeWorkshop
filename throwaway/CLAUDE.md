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

---

## Autonomous Build Rules

### (a) How to pick up a task

1. Read `PROGRESS.md` — find the first item marked `[ ] In Progress` or the next `[ ] Not Started` item.
2. Read `PRD.md` — confirm the task fits the approved scope.
3. Read `plan.md` — use the Implementation Steps as the execution checklist.
4. State the task in one sentence before writing any code.
5. Update `PROGRESS.md`: mark the task `[ ] In Progress` before starting.

### (b) Checks to run before committing

Run these in order. Do not commit if any fail.

1. `node build.js` — confirm the build step succeeds (no errors).
2. If tests exist: run the test command and confirm all pass.
3. If ESLint is configured: run `npx eslint .` and fix all errors (warnings are OK).
4. Visually verify the changed behaviour in the browser (or describe what was verified).
5. Run `/review` and address any blocking findings.
6. Check `git diff --staged` — confirm no `.env` files, no secrets, no unintended files.

### (c) What counts as "done"

A task is done when ALL of these are true:

- [ ] The requested behaviour works as described in `PRD.md`
- [ ] No console errors in the browser or terminal
- [ ] All checks in (b) above passed
- [ ] `PROGRESS.md` is updated: task moved to `Done`, timestamp recorded
- [ ] Changes committed via `/commit`

### (d) When to stop and ask

Stop immediately and wait for user input when:

- The task description is ambiguous or contradicts `PRD.md`
- A required file, secret, or external service is missing
- A check in (b) fails and the fix is non-obvious or touches more than one file
- The fix would require installing a new package or dependency
- Any destructive action is needed (delete file, reset git, drop data)
- A security concern is detected (exposed secret, unsafe input handling, etc.)

**Default: if uncertain about intent, ask. Do not guess.**
