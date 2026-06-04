export type Suit = 'h' | 'd' | 'c' | 's'
export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A'

export interface Card {
  rank: Rank
  suit: Suit
}

const RANKS: Rank[] = ['2','3','4','5','6','7','8','9','T','J','Q','K','A']
const SUITS: Suit[] = ['h','d','c','s']

export const RANK_DISPLAY: Record<Rank, string> = {
  '2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
  'T':'10','J':'J','Q':'Q','K':'K','A':'A'
}

export const SUIT_DISPLAY: Record<Suit, string> = {
  h:'♥', d:'♦', c:'♣', s:'♠'
}

export function createDeck(): Card[] {
  return SUITS.flatMap(suit => RANKS.map(rank => ({ rank, suit })))
}

export function shuffle(deck: Card[]): Card[] {
  const d = [...deck]
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[d[i], d[j]] = [d[j], d[i]]
  }
  return d
}

export function cardToPokerSolverString(card: Card): string {
  return `${card.rank}${card.suit}`
}
