import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Heads Up Hold'Em",
  description: 'Texas Hold\'Em heads-up against the computer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">{children}</body>
    </html>
  )
}
