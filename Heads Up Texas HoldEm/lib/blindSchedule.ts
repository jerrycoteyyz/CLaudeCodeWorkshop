export interface BlindLevel {
  small: number
  big: number
}

// Increases by 10/20 every 5 hands, capped at 100/200
export function getBlinds(handNumber: number): BlindLevel {
  const level = Math.min(Math.floor((handNumber - 1) / 5), 9)
  return {
    small: (level + 1) * 10,
    big: (level + 1) * 20,
  }
}
