# PRD — Dumb Plumbing Lead Calculator

**Last Updated**: 2026-06-02
**Status**: In Progress
**Maintained By**: Jerry Cote

---

## Project Overview

**Dumb Plumbing Lead Calculator**

An interactive, 3-question cost estimator that helps homeowners get a ballpark price for their plumbing repair — and converts them into leads for Dumb Plumbing.

Homeowners facing a plumbing problem often don't call a plumber because they fear a surprise bill. This tool removes that fear by giving them a free, instant estimate — then captures their contact info to deliver a full quote and $50 off offer.

---

## Problem Statement

Homeowners with plumbing problems Google the issue before calling anyone. If a plumber's website can answer "how much will this cost?" interactively, they stay on the page, build trust, and are far more likely to book. A static "call for a quote" page loses that moment.

---

## Target User

- **Who**: Homeowners in Jerry's service area with an active plumbing problem
- **What they need**: A fast, honest cost estimate without picking up the phone
- **Current workflow**: Google the problem, read generic articles, eventually call someone — or not at all

---

## Core Features

1. **3-Step Wizard** — Job type → Severity → Access level, with animated step transitions
2. **Instant Estimate** — Price range calculated client-side from a static price map in `src/lib/estimates.ts`
3. **Results Card** — Shows price range + urgency message + $50 off offer
4. **Lead Capture** — Soft prompt for name + email after estimate is shown; submits to Formspree
5. **Thank You + CTA** — Confirmation message + "Call Dumb Plumbing Now — 973-349-7885" button

---

## Wizard Questions

### Step 1 — Job Type
- Drain clog / blockage
- Water heater install or repair
- Toilet repair or replacement

### Step 2 — Severity (label changes based on Step 1)

| Job Type | Option A | Option B | Option C |
|---|---|---|---|
| Drain | Minor clog | Partial blockage | Complete blockage |
| Water Heater | Repair | Replace (same size) | Replace (upgrade) |
| Toilet | Repair | Standard replace | Full fixture upgrade |

### Step 3 — Access
- Easy access (standard location)
- Tight or hard to reach (crawl space, basement, wall)

---

## Estimate Price Map (edit in src/lib/estimates.ts)

| Job | Severity | Easy Access | Difficult Access |
|---|---|---|---|
| Drain | Minor | $75–$150 | $125–$225 |
| Drain | Partial | $150–$300 | $225–$400 |
| Drain | Complete | $300–$600 | $400–$800 |
| Water Heater | Repair | $150–$300 | $200–$400 |
| Water Heater | Replace same | $800–$1,400 | $1,000–$1,800 |
| Water Heater | Replace upgrade | $1,200–$2,200 | $1,500–$2,800 |
| Toilet | Repair | $100–$250 | $150–$350 |
| Toilet | Replace standard | $300–$600 | $450–$800 |
| Toilet | Replace upgrade | $600–$1,200 | $800–$1,500 |

---

## Urgency Messages (per job type)

- **Drain**: "Ignoring a blockage can crack pipes or cause sewage backup — repairs get 3x more expensive fast."
- **Water Heater**: "A failing water heater can leak and cause significant water damage to floors and walls."
- **Toilet**: "A running or leaking toilet can waste thousands of gallons and spike your water bill within weeks."

---

## Out of Scope (v1)

- User accounts or saved estimates
- Online booking / scheduling
- Payment processing
- Multiple service areas / zip code routing
- Admin dashboard for leads
- SMS follow-up

---

## Success Metrics

- [ ] Visitor can complete all 3 steps and see an estimate in under 60 seconds
- [ ] Lead capture form successfully delivers name + email to Jerry's inbox via Formspree
- [ ] Page loads in under 2 seconds on mobile
- [ ] No console errors in production
- [ ] Deployed live on Vercel

---

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Lead Delivery**: Formspree (free tier)
- **Hosting**: Vercel
- **Package Manager**: npm
- **Language/Runtime**: Node.js v18+

---

## Future: PostgreSQL Lead Storage (v2)

When adding a database, create this table:

```sql
CREATE TABLE leads (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  job_type      TEXT NOT NULL,
  severity      TEXT NOT NULL,
  access        TEXT NOT NULL,
  estimate_low  INTEGER NOT NULL,
  estimate_high INTEGER NOT NULL,
  created_at    TIMESTAMP DEFAULT now()
);
```

The Formspree form already passes all these fields as hidden inputs — swapping to PostgreSQL is a form action URL change + one API route.

---

## Key File Locations

```
Entry Point:     src/app/page.tsx
Components:      src/components/
Estimate Logic:  src/lib/estimates.ts
Config:          .env.local, package.json, tsconfig.json
```

---

## Build & Development Commands

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint
npm run type-check
```

---

## Critical Setup Steps

1. Copy `.env.example` to `.env.local` and add your Formspree form ID: `NEXT_PUBLIC_FORMSPREE_ID=your_form_id`
2. Create a free Formspree account at formspree.io and create a form pointed at jerrycote2536@gmail.com
3. Run `npm install` then `npm run dev`

---

## Done When (Launch Checklist)

- [ ] All 3 wizard steps work and display correct estimate
- [ ] Results card shows price range, urgency message, and $50 offer
- [ ] Lead capture form submits to Formspree and Jerry receives the email
- [ ] Thank you state shows with phone CTA button
- [ ] Mobile layout tested and responsive
- [ ] No console errors
- [ ] Deployed to Vercel
- [ ] `.env.local` is in `.gitignore`
