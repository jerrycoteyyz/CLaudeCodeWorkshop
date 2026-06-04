'use client'
import { useState } from 'react'
import type { PlayerAction } from '@/lib/ai/types'

interface Props {
  disabled: boolean
  toCall: number
  minRaise: number
  maxRaise: number
  pot: number
  onAction: (action: PlayerAction) => void
}

export default function ActionBar({ disabled, toCall, minRaise, maxRaise, pot, onAction }: Props) {
  const [raiseAmount, setRaiseAmount] = useState(minRaise)

  const canCheck = toCall === 0
  const canRaise = maxRaise >= minRaise

  return (
    <div className="flex flex-col items-center gap-3">
      {canRaise && (
        <div className="flex flex-col items-center gap-1 w-64">
          <div className="text-xs text-gray-400">Raise to: {raiseAmount}</div>
          <input
            type="range"
            min={minRaise}
            max={maxRaise}
            step={Math.max(1, Math.floor(pot * 0.05))}
            value={raiseAmount}
            onChange={e => setRaiseAmount(Number(e.target.value))}
            disabled={disabled}
            className="w-full accent-yellow-400"
          />
          <div className="flex justify-between w-full text-xs text-gray-500">
            <span>{minRaise}</span>
            <span>{maxRaise}</span>
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={() => onAction({ type: 'fold' })}
          disabled={disabled}
          className="px-5 py-2 rounded-lg bg-red-700 hover:bg-red-600 disabled:opacity-40 text-white font-semibold transition-colors"
        >
          Fold
        </button>
        <button
          onClick={() => onAction(canCheck ? { type: 'check' } : { type: 'call' })}
          disabled={disabled}
          className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 disabled:opacity-40 text-white font-semibold transition-colors"
        >
          {canCheck ? 'Check' : `Call ${toCall}`}
        </button>
        {canRaise && (
          <button
            onClick={() => onAction({ type: 'raise', amount: raiseAmount })}
            disabled={disabled}
            className="px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 disabled:opacity-40 text-white font-semibold transition-colors"
          >
            Raise
          </button>
        )}
      </div>
    </div>
  )
}
