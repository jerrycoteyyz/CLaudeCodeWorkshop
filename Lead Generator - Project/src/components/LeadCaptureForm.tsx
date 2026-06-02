'use client'

import { useState, FormEvent } from 'react'
import { EstimateResult, JobType, Severity, Access } from '@/lib/estimates'

interface Props {
  estimate: EstimateResult
  jobType: JobType
  severity: Severity
  access: Access
  onSubmit: () => void
}

export default function LeadCaptureForm({ estimate, jobType, severity, access, onSubmit }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!formId) {
      setError('Form not configured. Please contact us directly.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          job_type: jobType,
          severity,
          access,
          estimate_low: estimate.low,
          estimate_high: estimate.high,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      onSubmit()
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
      setSubmitting(false)
    }
  }

  return (
    <div className="border-t border-gray-100 pt-6">
      <p className="text-center text-gray-700 font-semibold text-lg mb-1">
        Want us to send you this estimate + a $50 off coupon?
      </p>
      <p className="text-center text-gray-400 text-sm mb-5">
        Drop your info below — no spam, just your quote.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-400"
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-xl transition-colors duration-200 text-lg"
        >
          {submitting ? 'Sending…' : 'Send Me the Quote + $50 Off'}
        </button>
      </form>
    </div>
  )
}
