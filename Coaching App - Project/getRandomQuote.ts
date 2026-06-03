const quotes = [
  "The only way to do great work is to love what you do.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you've ever wanted is on the other side of fear.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
]

export function getRandomQuote(): string {
  return quotes[Math.floor(Math.random() * quotes.length)]
}
