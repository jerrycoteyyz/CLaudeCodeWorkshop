export type JobType = 'drain' | 'water_heater' | 'toilet'
export type Severity = 'a' | 'b' | 'c'
export type Access = 'easy' | 'difficult'

export interface EstimateResult {
  low: number
  high: number
  urgency: string
  offer: string
}

export interface WizardAnswers {
  jobType: JobType
  severity: Severity
  access: Access
}

export const JOB_TYPE_LABELS: Record<JobType, string> = {
  drain: 'Drain Clog / Blockage',
  water_heater: 'Water Heater Install or Repair',
  toilet: 'Toilet Repair or Replacement',
}

export const SEVERITY_LABELS: Record<JobType, Record<Severity, string>> = {
  drain: {
    a: 'Minor clog',
    b: 'Partial blockage',
    c: 'Complete blockage',
  },
  water_heater: {
    a: 'Repair',
    b: 'Replace (same size)',
    c: 'Replace (upgrade)',
  },
  toilet: {
    a: 'Repair',
    b: 'Standard replace',
    c: 'Full fixture upgrade',
  },
}

export const ACCESS_LABELS: Record<Access, string> = {
  easy: 'Easy access (standard location)',
  difficult: 'Tight or hard to reach (crawl space, basement, wall)',
}

const URGENCY: Record<JobType, string> = {
  drain: 'Ignoring a blockage can crack pipes or cause sewage backup — repairs get 3x more expensive fast.',
  water_heater: 'A failing water heater can leak and cause significant water damage to floors and walls.',
  toilet: 'A running or leaking toilet can waste thousands of gallons and spike your water bill within weeks.',
}

const OFFER = 'Book this week and we\'ll knock $50 off your service call.'

type PriceRange = [number, number]

// [easyLow, easyHigh, difficultLow, difficultHigh]
const PRICE_MAP: Record<JobType, Record<Severity, [PriceRange, PriceRange]>> = {
  drain: {
    a: [[75, 150], [125, 225]],
    b: [[150, 300], [225, 400]],
    c: [[300, 600], [400, 800]],
  },
  water_heater: {
    a: [[150, 300], [200, 400]],
    b: [[800, 1400], [1000, 1800]],
    c: [[1200, 2200], [1500, 2800]],
  },
  toilet: {
    a: [[100, 250], [150, 350]],
    b: [[300, 600], [450, 800]],
    c: [[600, 1200], [800, 1500]],
  },
}

export function getEstimate(answers: WizardAnswers): EstimateResult {
  const [easyRange, difficultRange] = PRICE_MAP[answers.jobType][answers.severity]
  const [low, high] = answers.access === 'easy' ? easyRange : difficultRange
  return {
    low,
    high,
    urgency: URGENCY[answers.jobType],
    offer: OFFER,
  }
}
