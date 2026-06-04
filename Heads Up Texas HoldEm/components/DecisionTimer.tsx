'use client'
import { useEffect, useState } from 'react'

interface Props {
  seconds: number
  active: boolean
  onExpire: () => void
}

export default function DecisionTimer({ seconds, active, onExpire }: Props) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    setRemaining(seconds)
  }, [seconds, active])

  useEffect(() => {
    if (!active) return
    if (remaining <= 0) {
      onExpire()
      return
    }
    const id = setTimeout(() => setRemaining(r => r - 1), 1000)
    return () => clearTimeout(id)
  }, [active, remaining, onExpire])

  if (!active) return null

  const pct = (remaining / seconds) * 100
  const color = remaining > 8 ? 'bg-green-500' : remaining > 4 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-sm text-gray-400">Your turn — {remaining}s</div>
      <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
