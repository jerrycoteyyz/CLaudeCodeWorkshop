'use client'

import { EstimateResult, JobType, Severity, Access, JOB_TYPE_LABELS, SEVERITY_LABELS, ACCESS_LABELS } from '@/lib/estimates'

interface Props {
  estimate: EstimateResult
  jobType: JobType
  severity: Severity
  access: Access
}

function formatDollars(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

export default function ResultsCard({ estimate, jobType, severity, access }: Props) {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <p className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-1">Your Estimate</p>
        <div className="text-5xl font-extrabold text-gray-900">
          {formatDollars(estimate.low)} – {formatDollars(estimate.high)}
        </div>
        <p className="text-gray-500 text-sm mt-2">Estimated cost range for your job</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-4 text-sm text-gray-600 mb-4 space-y-1">
        <div><span className="font-medium text-gray-800">Job:</span> {JOB_TYPE_LABELS[jobType]}</div>
        <div><span className="font-medium text-gray-800">Details:</span> {SEVERITY_LABELS[jobType][severity]}</div>
        <div><span className="font-medium text-gray-800">Access:</span> {ACCESS_LABELS[access]}</div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
        <p className="text-amber-800 text-sm font-medium">⚠️ Heads up</p>
        <p className="text-amber-700 text-sm mt-1">{estimate.urgency}</p>
      </div>

      <div className="bg-blue-600 rounded-2xl p-4 text-center">
        <p className="text-white font-bold text-lg">🎉 Special Offer</p>
        <p className="text-blue-100 text-sm mt-1">{estimate.offer}</p>
      </div>
    </div>
  )
}
