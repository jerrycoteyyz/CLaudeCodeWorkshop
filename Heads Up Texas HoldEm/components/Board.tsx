'use client'
import Card from './Card'
import type { Card as CardType } from '@/lib/deck'

interface Props {
  cards: CardType[]
}

export default function Board({ cards }: Props) {
  return (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3, 4].map(i => (
        <Card key={i} card={cards[i]} faceDown={!cards[i]} />
      ))}
    </div>
  )
}
