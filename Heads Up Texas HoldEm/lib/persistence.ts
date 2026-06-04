import type { Card } from './deck'
import type { PlayerAction } from './ai/types'

export interface HandStartEvent {
  handNumber: number
  smallBlind: number
  bigBlind: number
  playerStack: number
  aiStack: number
}

export interface DecisionEvent {
  handNumber: number
  street: 'preflop' | 'flop' | 'turn' | 'river'
  actor: 'player' | 'ai'
  action: PlayerAction
  potBefore: number
  board: Card[]
  holeCards: Card[]
}

export interface HandEndEvent {
  handNumber: number
  winner: 'player' | 'ai' | 'tie'
  pot: number
  winningHandName: string
  playerStack: number
  aiStack: number
}

// No-op stub — replace function bodies with Supabase inserts when ready
export const persistence = {
  onHandStart(_event: HandStartEvent): void {},
  onDecision(_event: DecisionEvent): void {},
  onHandEnd(_event: HandEndEvent): void {},
}
