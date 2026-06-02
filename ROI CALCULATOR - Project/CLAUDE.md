# CLAUDE.md — Project Template

**Location:** `.claude/CLAUDE.md` at project root. Committed. Shared with the team.

**Loaded in addition to** `~/.claude/CLAUDE.md` (global) and any nested `CLAUDE.md` files — all merged at session start. This file does **not** replace the global one.

**Keep short.** Long CLAUDE.md files waste context and Claude ignores the tail. Target: reads in 30 seconds. If it grows past one page, move content to the reference files below.

### Context Files and Their Roles

| File | Purpose | Auto-loads? |
|---|---|---|
| `~/.claude/CLAUDE.md` (Global) | Your portable user rules | Yes |
| `.claude/CLAUDE.md` (Project, this file) | Team behavior for this repo | Yes |
| `SECURITY.md` | Mandatory security rules | **No — read on demand** |
| `PRD.md` | WHAT + WHY (requirements, "done") | **No — read at task start** |
| `spec/plan.md` | HOW (architecture, build order) | **No — read at task start** |
| `README.md` | How humans install / run | No |

**Living document:** When Claude does something wrong in a PR, add a rule here in the same PR.

---

## About This Project

- **Name**: [Project Name]
- **Type**: [Web App / Library / CLI / API / Mobile / etc.]
- **Primary Tech**: [e.g., Next.js + Supabase]
- **Key Purpose**: [One sentence]

---

## Security

Full rules in [`SECURITY.md`](../SECURITY.md). Read it before writing any code that handles secrets, user input, auth, data, or external calls.

**Non-negotiable baseline:** Never hardcode secrets — use `.env` only. `.env` must be in `.gitignore` before the first commit. Never log tokens or PII.

---

## Before Any Feature Work — Read These First

These files do **not** auto-load. Read them at the start of every new task, before writing code.

- **`PRD.md`** — WHAT and WHY. Confirm the goal and the "done" checklist before touching code.
- **`spec/plan.md`** — HOW. Follow the implementation order unless you have a reason to deviate (and say so).

If either file is missing or stale, flag it — run `/kickoff` to generate them.

---

## Team Workflow

- **Plan mode first** (`shift+tab` twice) for any non-trivial task. Switch to auto-accept after plan approval.
- **Slash commands** (`.claude/commands/`) — use the project's commands; don't re-prompt the same workflow twice.
- **Subagents** (`.claude/agents/`) — delegate to them for repeated investigation work.
- **MCP** (`.mcp.json`) — shared team tools are already configured.
- **Feedback loops** are required. Every change needs a verifiable signal: tests, screenshots, lint, type-check. Iterate until it passes. This doubles output quality.
- **Hooks** (`PostToolUse`) handle formatting/linting after edits so CI stays green.

---

## Permissions — Bypass Mode

This project runs in **bypass permissions mode** (`permissions.defaultMode: bypassPermissions` in `.claude/settings.json`). Approval prompts are suppressed.

**Claude must stop and confirm before any irreversible or shared-state action** — the absence of a prompt is not permission:

- File/folder deletion, `rm -rf`, overwriting uncommitted changes
- `git reset --hard`, force-push, branch deletion, pushing to `main`/`production`
- Installing, updating, or removing packages
- Any deploy, publish, or upload to an external service
- Opening/merging/closing PRs, sending MCP messages, DB writes/migrations/drops
- Modifying CI/CD, env vars, or secrets

Personal overrides: `.claude/settings.local.json` (gitignored).

---

## Project Rules for Claude

Fill these in for your project. Delete rows that don't apply.

- **Code style**: [e.g., TypeScript only in `src/`, no `var`, hooks not classes]
- **Naming**: [e.g., PascalCase components, camelCase utils, UPPER_SNAKE constants]
- **Testing**: [e.g., every new function gets a test file; Vitest for unit tests]
- **Branches**: [e.g., `feature/*`, `bugfix/*`, `hotfix/*`]
- **Critical files (ask before modifying)**: `src/db/schema.sql`, `.github/workflows/`, build config, `package.json`

---

## What Does NOT Belong in This File

Route content to the right layer. Keep this file short.

- Feature specs, requirements, success metrics → **`PRD.md`**
- Architecture, DB schema, API routes, build order → **`spec/plan.md`**
- Full security rules → **`SECURITY.md`**
- Install / run / contribute for humans → **`README.md`**
- Directory-specific rules → **nested `CLAUDE.md`** in that subdirectory
- Personal preferences → **`~/.claude/CLAUDE.md`** or **`.claude/settings.local.json`**

If this file exceeds ~1 page, audit and move content out.

---

## Key Contacts

- **Tech Lead**: [Name] — architecture, schema
- **Product Owner**: [Name] — requirements
- **Slack**: [#channel]

---

**Rule of Thumb:** If unsure, ask before acting. Better to clarify than break something.
