'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import Hand from '@/components/Hand'
import Board from '@/components/Board'
import ActionBar from '@/components/ActionBar'
import DecisionTimer from '@/components/DecisionTimer'
import {
  initialState,
  dealNewHand,
  applyAction,
  getAIAction,
  type GameState,
} from '@/lib/gameEngine'
import type { Card } from '@/lib/deck'
import { getBlinds } from '@/lib/blindSchedule'
import type { PlayerAction } from '@/lib/ai/types'

const AUTODEAL_MS = 3000
const TIMER_SECONDS = 15
const AI_THINK_MS = 1200

export default function Page() {
  const [state, setState] = useState<GameState & { _deck?: Card[] }>(initialState())
  const autoDealRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerFiredRef = useRef(false)

  const cancelAutoDeal = () => {
    if (autoDealRef.current) {
      clearTimeout(autoDealRef.current)
      autoDealRef.current = null
    }
  }

  const startNewGame = () => {
    cancelAutoDeal()
    setState(initialState())
  }

  const startHand = useCallback((prev: GameState) => {
    timerFiredRef.current = false
    setState(dealNewHand(prev))
  }, [])

  const handleAction = useCallback((action: PlayerAction) => {
    if (timerFiredRef.current) return  // guard against double-fire
    timerFiredRef.current = true
    setState(prev => {
      if (prev.activeActor !== 'player') return prev
      return applyAction(prev as GameState & { _deck?: Card[] }, action) as GameState
    })
  }, [])

  const handleTimerExpire = useCallback(() => {
    handleAction({ type: 'fold' })
  }, [handleAction])

  // Reset double-fire guard each time it becomes the player's turn
  useEffect(() => {
    if (state.activeActor === 'player' && state.phase === 'playing') {
      timerFiredRef.current = false
    }
  }, [state.activeActor, state.phase, state.street])

  // AI turn
  useEffect(() => {
    if (state.activeActor !== 'ai' || state.phase !== 'playing') return
    const id = setTimeout(() => {
      setState(prev => {
        if (prev.activeActor !== 'ai') return prev
        const action = getAIAction(prev)
        return applyAction(prev as GameState & { _deck?: Card[] }, action) as GameState
      })
    }, AI_THINK_MS)
    return () => clearTimeout(id)
  }, [state.activeActor, state.phase, state.street, state.pot])

  // Auto-deal after result
  useEffect(() => {
    if (state.phase !== 'result') return
    autoDealRef.current = setTimeout(() => {
      startHand(state)
    }, AUTODEAL_MS)
    return () => cancelAutoDeal()
  }, [state.phase, state.handNumber])

  const { small: sb, big: bb } = state.handNumber > 0
    ? getBlinds(state.handNumber)
    : { small: 10, big: 20 }

  const toCall = state.activeActor === 'player'
    ? Math.max(0, state.aiBet - state.playerBet)
    : 0

  const dealerLabel = state.dealerIsPlayer ? 'You (Dealer/SB)' : 'AI (Dealer/SB)'

  return (
    <main className="min-h-screen flex flex-col items-center justify-between py-8 px-4 gap-4">

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-2xl">
        <div className="text-gray-400 text-sm">
          Hand #{state.handNumber > 0 ? state.handNumber : '—'} &nbsp;·&nbsp;
          Blinds {sb}/{bb} &nbsp;·&nbsp;
          {dealerLabel}
        </div>
        <button
          onClick={startNewGame}
          className="px-4 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium transition-colors"
        >
          New Game
        </button>
      </div>

      {/* AI hand */}
      <Hand
        cards={state.aiHole}
        faceDown={state.phase !== 'result' && state.street !== 'showdown'}
        label={`AI — ${state.aiStack} chips`}
      />

      {/* Pot + community */}
      <div className="flex flex-col items-center gap-4">
        {state.pot > 0 && (
          <div className="text-yellow-400 font-semibold">Pot: {state.pot}</div>
        )}
        <Board cards={state.community} />
      </div>

      {/* Result message */}
      {state.phase === 'result' || state.phase === 'gameover' ? (
        <div className="text-center">
          <div className="text-xl font-bold text-yellow-300">{state.resultMessage}</div>
          {state.phase === 'gameover' && (
            <div className="mt-2 text-gray-400">
              {state.playerStack === 0 ? 'You are busted.' : 'AI is busted. You win!'} &nbsp;
              <button
                onClick={startNewGame}
                className="underline text-white hover:text-yellow-300"
              >
                Play again?
              </button>
            </div>
          )}
          {state.phase === 'result' && (
            <div className="text-sm text-gray-500 mt-1">Next hand dealing…</div>
          )}
        </div>
      ) : state.phase === 'waiting' ? (
        <div className="flex flex-col items-center gap-3">
          <div className="text-gray-400">Ready to play?</div>
          <button
            onClick={() => startHand(state)}
            className="px-8 py-3 rounded-xl bg-green-700 hover:bg-green-600 font-semibold text-lg transition-colors"
          >
            Deal
          </button>
        </div>
      ) : (
        <div className="h-8" />
      )}

      {/* Player hand */}
      <Hand
        cards={state.playerHole}
        label={`You — ${state.playerStack} chips`}
      />

      {/* Timer + actions */}
      <div className="flex flex-col items-center gap-3 w-full max-w-md">
        <DecisionTimer
          key={`${state.handNumber}-${state.street}-${state.activeActor}`}
          seconds={TIMER_SECONDS}
          active={state.activeActor === 'player' && state.phase === 'playing'}
          onExpire={handleTimerExpire}
        />
        {state.phase === 'playing' && (
          <ActionBar
            disabled={state.activeActor !== 'player'}
            toCall={toCall}
            minRaise={state.minRaise + toCall}
            maxRaise={state.playerStack}
            pot={state.pot}
            onAction={handleAction}
          />
        )}
        {state.phase === 'playing' && state.activeActor === 'ai' && (
          <div className="text-sm text-gray-500">AI is thinking…</div>
        )}
      </div>
    </main>
  )
}
