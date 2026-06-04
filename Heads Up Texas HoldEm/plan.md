# Plan: Heads Up Texas Hold'Em — Full Build

**Date:** 2026-06-04
**Status:** Approved

---

## Goal
A playable heads-up Texas Hold'Em Next.js app: human vs beginner AI, escalating blinds, 15-second decision timer, auto-deal, and a persistence stub ready for Supabase.

---

## Current State
Empty project directory. Scaffold files written. No Next.js app yet.

---

## Proposed Solution
Client-side Next.js app. All game logic in pure TypeScript modules (no React dependency) so it's testable in isolation. React components handle display only. AI behind an interface so it's swappable. Persistence behind a stub interface so Supabase drops in without touching game logic.

---

## Implementation Steps

- [ ] 1. Scaffold Next.js app with Tailwind, install pokersolver
- [ ] 2. Build `src/lib/deck.ts` — card types, deck creation, shuffle, deal
- [ ] 3. Build `src/lib/handEvaluator.ts` — wrap pokersolver, rank hands
- [ ] 4. Build `src/lib/blindSchedule.ts` — blind level table, hand count → blinds
- [ ] 5. Build `src/lib/gameEngine.ts` — full game state machine (betting, pot, showdown, rotation)
- [ ] 6. Build `src/lib/ai/types.ts` — AIPlayer interface
- [ ] 7. Build `src/lib/ai/beginnerAI.ts` — rule-based AI implementation
- [ ] 8. Build `src/lib/persistence.ts` — no-op stub with typed event signatures
- [ ] 9. Build UI components: Card, Hand, Board, ActionBar, ChipStack, DecisionTimer
- [ ] 10. Wire everything in `src/app/page.tsx` — game loop, timer, auto-deal, New Game
- [ ] 11. Style with Tailwind — clean minimal look
- [ ] 12. Test full hand end-to-end, verify pot math and blind schedule
- [ ] 13. Deploy to Vercel

---

## Files to Create
| File | Purpose |
|---|---|
| `src/lib/deck.ts` | Card types, deck factory, shuffle, deal |
| `src/lib/handEvaluator.ts` | pokersolver wrapper, hand strength 0–1 score |
| `src/lib/blindSchedule.ts` | Returns {small, big} blinds given hand number |
| `src/lib/gameEngine.ts` | Game state machine — the heart of the app |
| `src/lib/ai/types.ts` | AIPlayer interface definition |
| `src/lib/ai/beginnerAI.ts` | Beginner rule-based AI |
| `src/lib/persistence.ts` | No-op stub — onHandStart, onPlayerDecision, onHandEnd |
| `src/components/Card.tsx` | Single card component, face-up or face-down |
| `src/components/Hand.tsx` | Two-card hole hand |
| `src/components/Board.tsx` | Community cards (flop/turn/river) |
| `src/components/ActionBar.tsx` | Fold/Call/Raise buttons + raise slider |
| `src/components/ChipStack.tsx` | Pot, stacks, blind level display |
| `src/components/DecisionTimer.tsx` | 15-second countdown, auto-fold on expiry |
| `src/app/page.tsx` | Root page — game loop, state, New Game button |

---

## Definition of Done
- [ ] Full hand completes from deal to pot payout without errors
- [ ] AI never makes an illegal move
- [ ] Blinds increase correctly every 5 hands
- [ ] Timer auto-folds and does not double-fire
- [ ] New Game resets mid-hand and mid-pause cleanly
- [ ] No console errors
- [ ] /review passes
- [ ] Committed via /commit
- [ ] Deployed to Vercel

---

## Risks & Notes
- **Risk:** Timer fires simultaneously with player action → **Mitigation:** ref-based cancel flag checked before applying timer fold
- **Risk:** All-in when blind > stack → **Mitigation:** handle in gameEngine before first render, standard heads-up all-in rules
- **Risk:** Auto-deal interrupted by New Game → **Mitigation:** cancel token pattern on the setTimeout, cleared on New Game
- **Note:** No Vercel-specific APIs — `next build` output is portable to AWS Amplify or EC2 unchanged
- **Note:** `persistence.ts` stub is the only file that changes when Supabase is added
