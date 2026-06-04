import { Hand } from 'pokersolver'
import type { Card } from './deck'
import { cardToPokerSolverString } from './deck'

export interface HandResult {
  name: string
  rank: number  // 1 (high card) – 9 (straight flush)
  strength: number  // 0–1 normalized score for AI use
}

export function evaluateHand(holeCards: Card[], communityCards: Card[]): HandResult {
  const cards = [...holeCards, ...communityCards].map(cardToPokerSolverString)
  const hand = Hand.solve(cards)
  return {
    name: hand.name,
    rank: hand.rank,
    strength: hand.rank / 9,
  }
}

export function compareHands(
  holeA: Card[], holeB: Card[], community: Card[]
): 'a' | 'b' | 'tie' {
  const cardStrings = community.map(cardToPokerSolverString)
  const handA = Hand.solve([...holeA.map(cardToPokerSolverString), ...cardStrings])
  const handB = Hand.solve([...holeB.map(cardToPokerSolverString), ...cardStrings])
  const winners = Hand.winners([handA, handB])
  if (winners.length === 2) return 'tie'
  return winners[0] === handA ? 'a' : 'b'
}
