'use client'

import { JobType, Severity, SEVERITY_LABELS } from '@/lib/estimates'

interface Props {
  jobType: JobType
  onSelect: (severity: Severity) => void
}

const SEVERITY_DESCRIPTIONS: Record<JobType, Record<Severity, string>> = {
  drain: {
    a: 'Water drains slowly but still moves',
    b: 'Drain is mostly blocked, backing up',
    c: 'Nothing gets through at all',
  },
  water_heater: {
    a: 'Still have hot water, but something\'s off',
    b: 'Same capacity tank, different unit',
    c: 'Larger tank or higher-efficiency model',
  },
  toilet: {
    a: 'Running, leaking, or flushing issues',
    b: 'Standard toilet, similar style',
    c: 'New style, elongated, or high-end fixture',
  },
}

export default function StepSeverity({ jobType, onSelect }: Props) {
  const severities: Severity[] = ['a', 'b', 'c']

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        How bad is it?
      </h2>
      <p className="text-gray-500 text-center mb-8">Be honest — it helps us give you a better estimate.</p>
      <div className="grid grid-cols-1 gap-4">
        {severities.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="flex items-center gap-4 w-full p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
          >
            <span className="text-2xl font-bold text-gray-300 group-hover:text-blue-400 w-8 text-center">
              {s.toUpperCase()}
            </span>
            <div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-700 text-lg leading-tight">
                {SEVERITY_LABELS[jobType][s]}
              </div>
              <div className="text-gray-500 text-sm mt-0.5">
                {SEVERITY_DESCRIPTIONS[jobType][s]}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
