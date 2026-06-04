'use client'
import type { Card as CardType } from '@/lib/deck'
import { RANK_DISPLAY, SUIT_DISPLAY } from '@/lib/deck'

interface Props {
  card?: CardType
  faceDown?: boolean
}

export default function Card({ card, faceDown }: Props) {
  if (faceDown || !card) {
    return (
      <div className="w-14 h-20 rounded-lg bg-blue-800 border-2 border-blue-600 flex items-center justify-center shadow-md">
        <div className="w-10 h-16 rounded border border-blue-500 opacity-40" />
      </div>
    )
  }

  const isRed = card.suit === 'h' || card.suit === 'd'

  return (
    <div className={`w-14 h-20 rounded-lg bg-white border border-gray-300 flex flex-col justify-between p-1 shadow-md select-none ${isRed ? 'text-red-600' : 'text-gray-900'}`}>
      <div className="text-xs font-bold leading-none">{RANK_DISPLAY[card.rank]}</div>
      <div className="text-xl font-bold text-center leading-none">{SUIT_DISPLAY[card.suit]}</div>
      <div className="text-xs font-bold leading-none self-end rotate-180">{RANK_DISPLAY[card.rank]}</div>
    </div>
  )
}
