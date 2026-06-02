import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plumbing Cost Estimator — Dumb Plumbing',
  description: 'Find out what your plumbing repair might cost in under 60 seconds. Free instant estimate from Dumb Plumbing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased font-sans">{children}</body>
    </html>
  )
}
