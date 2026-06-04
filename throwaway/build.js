import { readFileSync, writeFileSync, existsSync } from 'fs'

// Load .env manually for local dev (no dotenv dependency needed)
if (existsSync('.env')) {
  const lines = readFileSync('.env', 'utf8').split('\n')
  for (const line of lines) {
    const eqIndex = line.indexOf('=')
    if (eqIndex > 0) {
      const key = line.slice(0, eqIndex).trim()
      const val = line.slice(eqIndex + 1).trim()
      if (key) process.env[key] = val
    }
  }
}

const config = {
  tickerSymbol: process.env.TICKER_SYMBOL ?? 'DUMMY',
}

writeFileSync('config.js', `window.APP_CONFIG = ${JSON.stringify(config)};\n`)
console.log('config.js generated:', config)
