# Dumb Plumbing — Lead Calculator

Interactive 3-question cost estimator for plumbing repairs. Visitors pick their job type, severity, and access level — and get an instant price range, urgency message, and a $50 off offer. Contact info is captured and emailed to the business owner via Formspree.

---

## Quick Start

### Prerequisites
- Node.js v18+
- npm
- A free Formspree account (formspree.io)

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd "Lead Generator - Project"

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Open .env.local and add your Formspree form ID

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit `.env.local`.

```
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

To get your Formspree ID:
1. Go to formspree.io and create a free account
2. Create a new form, set the destination email to jerrycote2536@gmail.com
3. Copy the form ID from the form's endpoint URL

---

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Check code style
npm run type-check   # TypeScript type checking (tsc --noEmit)
```

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Single page — hero + calculator
│   └── layout.tsx            # Root layout, fonts, metadata
├── components/
│   ├── CalculatorWizard.tsx  # Owns wizard step state
│   ├── StepJobType.tsx       # Step 1 — job type cards
│   ├── StepSeverity.tsx      # Step 2 — severity options
│   ├── StepAccess.tsx        # Step 3 — access difficulty
│   ├── ResultsCard.tsx       # Price range + urgency + offer
│   ├── LeadCaptureForm.tsx   # Name + email → Formspree
│   └── ThankYou.tsx          # Confirmation + call CTA
└── lib/
    └── estimates.ts          # All price logic — edit here to update prices
```

---

## Updating Prices

All estimate data lives in `src/lib/estimates.ts`. Edit price ranges, urgency messages, or the special offer there — no component changes needed.

---

## Deployment

This project deploys to Vercel.

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

Add `NEXT_PUBLIC_FORMSPREE_ID` as an environment variable in your Vercel project dashboard before deploying.

---

## Troubleshooting

**Form submissions not arriving**
- Check that `NEXT_PUBLIC_FORMSPREE_ID` matches your Formspree form ID exactly
- Verify the Formspree form destination email is correct
- Check your spam folder

**Port already in use**
- Run `PORT=3001 npm run dev`

---

## v2 Roadmap

- PostgreSQL (Supabase) to store leads in a database
- Admin dashboard to view and export leads
- Online booking / scheduling integration

---

**Business:** Dumb Plumbing
**Phone:** 973-349-7885
**Owner:** Jerry Cote — jerrycote2536@gmail.com
