'use client'
import Card from './Card'
import type { Card as CardType } from '@/lib/deck'

interface Props {
  cards: CardType[]
  faceDown?: boolean
  label?: string
}

export default function Hand({ cards, faceDown, label }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {label && <div className="text-sm text-gray-400 font-medium">{label}</div>}
      <div className="flex gap-2">
        {cards.length === 0
          ? [0, 1].map(i => <Card key={i} faceDown />)
          : cards.map((c, i) => <Card key={i} card={c} faceDown={faceDown} />)
        }
      </div>
    </div>
  )
}
