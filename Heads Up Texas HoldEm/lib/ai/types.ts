import type { Card } from '../deck'

export type PlayerAction =
  | { type: 'fold' }
  | { type: 'call' }
  | { type: 'raise'; amount: number }
  | { type: 'check' }

export interface AIDecisionContext {
  holeCards: Card[]
  communityCards: Card[]
  pot: number
  toCall: number        // chips needed to call (0 = can check)
  myStack: number
  opponentStack: number
  minRaise: number
  maxRaise: number      // capped at myStack
  street: 'preflop' | 'flop' | 'turn' | 'river'
  handNumber: number
}

export interface AIPlayer {
  decide(context: AIDecisionContext): PlayerAction
}
