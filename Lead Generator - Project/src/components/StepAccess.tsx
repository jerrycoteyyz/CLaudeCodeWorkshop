'use client'

import { Access } from '@/lib/estimates'

interface Props {
  onSelect: (access: Access) => void
}

const options: { value: Access; icon: string; label: string; description: string }[] = [
  {
    value: 'easy',
    icon: '✅',
    label: 'Easy access',
    description: 'Standard location — kitchen, bathroom, utility closet',
  },
  {
    value: 'difficult',
    icon: '⚠️',
    label: 'Tight or hard to reach',
    description: 'Crawl space, finished basement, inside a wall',
  },
]

export default function StepAccess({ onSelect }: Props) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        How easy is it to get to?
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Access affects how long the job takes — which affects cost.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="flex items-center gap-4 w-full p-5 rounded-2xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left group"
          >
            <span className="text-3xl">{opt.icon}</span>
            <div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-700 text-lg leading-tight">
                {opt.label}
              </div>
              <div className="text-gray-500 text-sm mt-0.5">{opt.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
