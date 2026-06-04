import type { AIPlayer, AIDecisionContext, PlayerAction } from './types'
import { evaluateHand } from '../handEvaluator'

export const beginnerAI: AIPlayer = {
  decide(ctx: AIDecisionContext): PlayerAction {
    const { holeCards, communityCards, pot, toCall, myStack, minRaise, maxRaise } = ctx
    const { strength } = evaluateHand(holeCards, communityCards)

    const canCheck = toCall === 0
    const potOdds = toCall > 0 ? toCall / (pot + toCall) : 0
    const bluff = Math.random() < 0.08  // bluff ~8% of the time

    if (bluff && canCheck) {
      const raiseAmt = Math.min(Math.floor(pot * 0.75), maxRaise)
      if (raiseAmt >= minRaise) return { type: 'raise', amount: raiseAmt }
    }

    if (bluff && !canCheck && strength < 0.25) {
      const raiseAmt = Math.min(Math.floor(pot * 0.5), maxRaise)
      if (raiseAmt >= minRaise) return { type: 'raise', amount: raiseAmt }
    }

    // Strong hand — raise
    if (strength >= 0.7) {
      const raiseAmt = Math.min(Math.floor(pot * (0.5 + strength * 0.5)), maxRaise)
      if (raiseAmt >= minRaise && myStack > minRaise) return { type: 'raise', amount: raiseAmt }
      return canCheck ? { type: 'check' } : { type: 'call' }
    }

    // Medium hand — call if pot odds justify it
    if (strength >= 0.35) {
      if (canCheck) return { type: 'check' }
      if (potOdds < strength) return { type: 'call' }
      return { type: 'fold' }
    }

    // Weak hand — check or fold
    if (canCheck) return { type: 'check' }
    if (potOdds < 0.2) return { type: 'call' }
    return { type: 'fold' }
  }
}
