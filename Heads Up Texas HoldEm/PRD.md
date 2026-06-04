# PRD — Heads Up Texas Hold'Em

## Overview
**Project:** Heads Up Texas Hold'Em
**Author:** Jerry Cote
**Date:** 2026-06-04
**Status:** Approved

---

## Problem Statement
A playable heads-up Texas Hold'Em game in the browser. Human vs computer, fast-paced, with escalating blinds and a decision timer to keep play moving.

---

## Goals
- Playable heads-up game from deal to showdown, human vs AI
- Fast pace: auto-deal, 15-second decision timer, escalating blinds
- Architecture ready for Supabase analytics hook-in (no implementation now)

## Non-Goals (Out of Scope)
- User accounts or authentication
- Multiplayer
- Tournament bracket mode
- Supabase implementation (stub only)
- AWS deployment (supported by build output, not configured now)

---

## Users
**Primary user:** Single player competing against computer AI in the browser. No sign-in required.

---

## User Stories
| As a… | I want to… | So that… |
|---|---|---|
| Player | See my cards and the board clearly | I can make informed decisions |
| Player | Fold, call, or raise with a slider | I have full control over my action |
| Player | See a countdown timer | I know how long I have to decide |
| Player | Have hands auto-deal | The game stays fast and engaging |
| Player | Click New Game | I can reset and start fresh anytime |

---

## Functional Requirements

### Must Have (MVP)
- [ ] Full hand: pre-flop → flop → turn → river → showdown
- [ ] Heads-up blind rules: dealer = small blind, opponent = big blind
- [ ] Button rotates each hand
- [ ] Starting stacks: 5000 chips each
- [ ] Blind schedule: 10/20 base, +10/20 every 5 hands, capped at 100/200
- [ ] Player actions: Fold, Call, Raise (with raise slider)
- [ ] Actions disabled during AI turn
- [ ] 15-second decision timer, visible on screen, auto-folds on expiry
- [ ] Timer cancels cleanly if player acts before expiry (no double-action)
- [ ] Auto-deal next hand after 3-second pause
- [ ] New Game button resets everything (works mid-hand and mid-pause)
- [ ] AI makes legal moves every turn (beginner rule-based)
- [ ] Pot pays out correctly at showdown
- [ ] All-in handling when player cannot cover blind

### Should Have
- [ ] Blind level indicator visible on screen
- [ ] Hand result message (who won, winning hand name)
- [ ] Running hand count display

### Nice to Have
- [ ] Animation on card deal
- [ ] Sound effects

---

## Non-Functional Requirements
- **Performance:** Playable in browser with no perceptible lag on game logic
- **Accessibility:** Keyboard-accessible action buttons
- **Security:** See SECURITY.md
- **Browser support:** Latest Chrome, Firefox, Safari, Edge

---

## Tech Stack
- Frontend: Next.js (App Router), React, TypeScript
- Backend: None (client-side only)
- Database: None now — `src/lib/persistence.ts` stub ready for Supabase
- Hosting: Vercel (now), AWS-compatible (no Vercel-specific APIs used)
- Key libraries: `pokersolver` (hand evaluation), Tailwind CSS

---

## Persistence Hook (future Supabase)
All game events flow through `src/lib/persistence.ts` as no-ops today.
Events to capture when wired up:
- `onHandStart(handNumber, blinds, stacks)`
- `onPlayerDecision(handNumber, street, action, amount, potSize, board, holeCards)`
- `onHandEnd(handNumber, winner, pot, winningHand)`

---

## Success Metrics
- Player can complete a full hand without errors
- AI never makes an illegal move
- Pot is always correct at showdown
- New Game always resets cleanly
