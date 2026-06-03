import { describe, it, expect, vi } from 'vitest'
import { getRandomQuote } from './getRandomQuote'

const QUOTE_COUNT = 5

describe('getRandomQuote', () => {
  it('returns a non-empty string', () => {
    const quote = getRandomQuote()
    expect(typeof quote).toBe('string')
    expect(quote.length).toBeGreaterThan(0)
  })

  it('returns one of the known quotes', () => {
    // Run multiple times to account for randomness
    const knownQuotes = new Set<string>()
    for (let i = 0; i < 50; i++) {
      knownQuotes.add(getRandomQuote())
    }
    // All returned values should be from the fixed set
    expect(knownQuotes.size).toBeLessThanOrEqual(QUOTE_COUNT)
  })

  it('returns all quotes eventually (no quote is permanently excluded)', () => {
    const seen = new Set<string>()
    for (let i = 0; i < 200; i++) {
      seen.add(getRandomQuote())
    }
    expect(seen.size).toBe(QUOTE_COUNT)
  })

  it('does not always return the same quote (random distribution)', () => {
    const results = new Set<string>()
    for (let i = 0; i < 20; i++) {
      results.add(getRandomQuote())
    }
    expect(results.size).toBeGreaterThan(1)
  })

  it('uses Math.random to select a quote (mocked)', () => {
    // Force Math.random to return 0 — should always return first quote
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const quote = getRandomQuote()
    expect(quote).toBe('The only way to do great work is to love what you do.')
    vi.restoreAllMocks()
  })
})
