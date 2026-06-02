'use client'

import { JobType, JOB_TYPE_LABELS } from '@/lib/estimates'

interface Props {
  onSelect: (jobType: JobType) => void
}

const JOB_ICONS: Record<JobType, string> = {
  drain: '🚿',
  water_heater: '🔥',
  toilet: '🚽',
}

const JOB_DESCRIPTIONS: Record<JobType, string> = {
  drain: 'Slow drain, gurgling, or complete blockage',
  water_heater: 'No hot water, leaking tank, or full replacement',
  toilet: 'Running, leaking, cracked, or needs replacing',
}

export default function StepJobType({ onSelect }: Props) {
  const jobTypes: JobType[] = ['drain', 'water_heater', 'toilet']

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        What&apos;s going on?
      </h2>
      <p className="text-gray-500 text-center mb-8">Pick the one that best describes your issue.</p>
      <div className="grid grid-cols-1 gap-4">
        {jobTypes.map((job) => (
          <button
            key={job}
            onClick={() => onSelect(job)}
            className="flex items-center gap-4 w-full p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
          >
            <span className="text-4xl">{JOB_ICONS[job]}</span>
            <div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-700 text-lg leading-tight">
                {JOB_TYPE_LABELS[job]}
              </div>
              <div className="text-gray-500 text-sm mt-0.5">{JOB_DESCRIPTIONS[job]}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
