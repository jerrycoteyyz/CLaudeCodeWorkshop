import { createDeck, shuffle } from './deck'
import type { Card } from './deck'
import { compareHands, evaluateHand } from './handEvaluator'
import { getBlinds } from './blindSchedule'
import { beginnerAI } from './ai/beginnerAI'
import type { PlayerAction } from './ai/types'
import { persistence } from './persistence'

export type Street = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown'

export interface GameState {
  handNumber: number
  playerStack: number
  aiStack: number
  playerHole: Card[]
  aiHole: Card[]
  community: Card[]
  pot: number
  playerBet: number     // amount committed this street
  aiBet: number
  street: Street
  dealerIsPlayer: boolean   // true = player is dealer/small blind
  activeActor: 'player' | 'ai' | null  // whose turn
  phase: 'waiting' | 'playing' | 'result' | 'gameover'
  resultMessage: string
  winnerThisHand: 'player' | 'ai' | 'tie' | null
  minRaise: number
}

const STARTING_STACK = 5000

export function initialState(): GameState {
  return {
    handNumber: 0,
    playerStack: STARTING_STACK,
    aiStack: STARTING_STACK,
    playerHole: [],
    aiHole: [],
    community: [],
    pot: 0,
    playerBet: 0,
    aiBet: 0,
    street: 'preflop',
    dealerIsPlayer: true,
    activeActor: null,
    phase: 'waiting',
    resultMessage: '',
    winnerThisHand: null,
    minRaise: 0,
  }
}

export function dealNewHand(prev: GameState): GameState {
  const handNumber = prev.handNumber + 1
  const { small, big } = getBlinds(handNumber)
  const deck = shuffle(createDeck())

  // Heads-up: dealer = small blind, opponent = big blind
  const dealerIsPlayer = prev.handNumber === 0 ? true : !prev.dealerIsPlayer

  const smallBlindActor = dealerIsPlayer ? 'player' : 'ai'
  const bigBlindActor = dealerIsPlayer ? 'ai' : 'player'

  let playerStack = prev.playerStack
  let aiStack = prev.aiStack

  const smallPaid = Math.min(small, smallBlindActor === 'player' ? playerStack : aiStack)
  const bigPaid = Math.min(big, bigBlindActor === 'player' ? playerStack : aiStack)

  if (smallBlindActor === 'player') { playerStack -= smallPaid } else { aiStack -= smallPaid }
  if (bigBlindActor === 'player') { playerStack -= bigPaid } else { aiStack -= bigPaid }

  const playerHole = [deck[0], deck[2]]
  const aiHole = [deck[1], deck[3]]
  const remaining = deck.slice(4)

  const playerBet = dealerIsPlayer ? smallPaid : bigPaid
  const aiBet = dealerIsPlayer ? bigPaid : smallPaid
  const pot = smallPaid + bigPaid

  // Pre-flop: small blind (dealer) acts first heads-up
  const activeActor = smallBlindActor

  const state: GameState = {
    handNumber,
    playerStack,
    aiStack,
    playerHole,
    aiHole,
    community: remaining.slice(0, 0),  // no community yet
    pot,
    playerBet,
    aiBet,
    street: 'preflop',
    dealerIsPlayer,
    activeActor,
    phase: 'playing',
    resultMessage: '',
    winnerThisHand: null,
    minRaise: big,
    _deck: remaining,
  } as GameState & { _deck: Card[] }

  persistence.onHandStart({
    handNumber,
    smallBlind: small,
    bigBlind: big,
    playerStack: prev.playerStack,
    aiStack: prev.aiStack,
  })

  return state
}

export function applyAction(
  state: GameState & { _deck?: Card[] },
  action: PlayerAction
): GameState & { _deck?: Card[] } {
  const actor = state.activeActor!
  let { playerStack, aiStack, playerBet, aiBet, pot, street } = state
  const deck = state._deck ?? []

  persistence.onDecision({
    handNumber: state.handNumber,
    street: state.street as 'preflop' | 'flop' | 'turn' | 'river',
    actor,
    action,
    potBefore: pot,
    board: state.community,
    holeCards: actor === 'player' ? state.playerHole : state.aiHole,
  })

  if (action.type === 'fold') {
    return resolveWinner(state, actor === 'player' ? 'ai' : 'player', 'fold')
  }

  const toCall = actor === 'player'
    ? Math.max(0, aiBet - playerBet)
    : Math.max(0, playerBet - aiBet)

  if (action.type === 'call' || action.type === 'check') {
    if (actor === 'player') {
      const paid = Math.min(toCall, playerStack)
      playerStack -= paid
      playerBet += paid
      pot += paid
    } else {
      const paid = Math.min(toCall, aiStack)
      aiStack -= paid
      aiBet += paid
      pot += paid
    }
  }

  if (action.type === 'raise') {
    const total = action.amount  // total bet for the street
    if (actor === 'player') {
      const paid = Math.min(total - playerBet, playerStack)
      playerStack -= paid
      playerBet += paid
      pot += paid
    } else {
      const paid = Math.min(total - aiBet, aiStack)
      aiStack -= paid
      aiBet += paid
      pot += paid
    }
  }

  const next = { ...state, playerStack, aiStack, playerBet, aiBet, pot, _deck: deck }

  // After call/check — if bets are equal, advance street
  if (action.type !== 'raise' && playerBet === aiBet) {
    return advanceStreet(next)
  }

  // After raise — opponent acts next
  next.activeActor = actor === 'player' ? 'ai' : 'player'
  const { big } = getBlinds(state.handNumber)
  next.minRaise = action.type === 'raise'
    ? (action.amount - Math.max(playerBet, aiBet)) + action.amount
    : big

  return next
}

function advanceStreet(
  state: GameState & { _deck?: Card[] }
): GameState & { _deck?: Card[] } {
  const deck = state._deck ?? []
  let community = [...state.community]
  let street: Street
  let remaining = [...deck]

  if (state.street === 'preflop') {
    community = remaining.splice(0, 3)  // burn not simulated for simplicity
    street = 'flop'
  } else if (state.street === 'flop') {
    community = [...community, remaining.splice(0, 1)[0]]
    street = 'turn'
  } else if (state.street === 'turn') {
    community = [...community, remaining.splice(0, 1)[0]]
    street = 'river'
  } else {
    return resolveWinner(state, null, 'showdown')
  }

  // Post-flop: big blind (non-dealer) acts first
  const activeActor: 'player' | 'ai' = state.dealerIsPlayer ? 'ai' : 'player'
  const { big } = getBlinds(state.handNumber)

  return {
    ...state,
    community,
    street,
    playerBet: 0,
    aiBet: 0,
    activeActor,
    minRaise: big,
    _deck: remaining,
  }
}

function resolveWinner(
  state: GameState & { _deck?: Card[] },
  forced: 'player' | 'ai' | null,
  reason: 'fold' | 'showdown'
): GameState & { _deck?: Card[] } {
  let winner: 'player' | 'ai' | 'tie'
  let winningHandName = ''

  if (forced) {
    winner = forced
    winningHandName = reason === 'fold' ? 'opponent folded' : ''
  } else {
    const result = compareHands(state.playerHole, state.aiHole, state.community)
    winner = result === 'a' ? 'player' : result === 'b' ? 'ai' : 'tie'
    winningHandName = evaluateHand(
      winner === 'ai' ? state.aiHole : state.playerHole,
      state.community
    ).name
  }

  let { playerStack, aiStack, pot } = state

  if (winner === 'player') {
    playerStack += pot
  } else if (winner === 'ai') {
    aiStack += pot
  } else {
    const half = Math.floor(pot / 2)
    playerStack += half
    aiStack += pot - half
  }

  const phase: GameState['phase'] =
    playerStack === 0 || aiStack === 0 ? 'gameover' : 'result'

  const resultMessage =
    winner === 'tie'
      ? `Split pot — ${winningHandName || 'tie'}`
      : `${winner === 'player' ? 'You win' : 'AI wins'} — ${winningHandName}`

  persistence.onHandEnd({
    handNumber: state.handNumber,
    winner,
    pot,
    winningHandName,
    playerStack,
    aiStack,
  })

  return {
    ...state,
    playerStack,
    aiStack,
    pot: 0,
    activeActor: null,
    phase,
    resultMessage,
    winnerThisHand: winner,
    street: 'showdown',
  }
}

export function getAIAction(state: GameState): PlayerAction {
  const toCall = Math.max(0, state.playerBet - state.aiBet)
  return beginnerAI.decide({
    holeCards: state.aiHole,
    communityCards: state.community,
    pot: state.pot,
    toCall,
    myStack: state.aiStack,
    opponentStack: state.playerStack,
    minRaise: state.minRaise,
    maxRaise: state.aiStack,
    street: state.street as 'preflop' | 'flop' | 'turn' | 'river',
    handNumber: state.handNumber,
  })
}
