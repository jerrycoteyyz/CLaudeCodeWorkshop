'use client'

import { useState } from 'react'
import { JobType, Severity, Access, EstimateResult, WizardAnswers, getEstimate } from '@/lib/estimates'
import StepJobType from './StepJobType'
import StepSeverity from './StepSeverity'
import StepAccess from './StepAccess'
import ResultsCard from './ResultsCard'
import LeadCaptureForm from './LeadCaptureForm'
import ThankYou from './ThankYou'

type WizardStep = 1 | 2 | 3 | 'results' | 'thankyou'

export default function CalculatorWizard() {
  const [step, setStep] = useState<WizardStep>(1)
  const [jobType, setJobType] = useState<JobType | null>(null)
  const [severity, setSeverity] = useState<Severity | null>(null)
  const [access, setAccess] = useState<Access | null>(null)
  const [estimate, setEstimate] = useState<EstimateResult | null>(null)

  function handleJobType(value: JobType) {
    setJobType(value)
    setStep(2)
  }

  function handleSeverity(value: Severity) {
    setSeverity(value)
    setStep(3)
  }

  function handleAccess(value: Access) {
    setAccess(value)
    const answers: WizardAnswers = { jobType: jobType!, severity: severity!, access: value }
    setEstimate(getEstimate(answers))
    setStep('results')
  }

  function handleLeadSubmit() {
    setStep('thankyou')
  }

  const stepNumber = step === 'results' || step === 'thankyou' ? null : step

  return (
    <div className="w-full max-w-lg mx-auto">
      {stepNumber !== null && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step {stepNumber} of 3</span>
            <span>{Math.round((stepNumber / 3) * 100)}% done</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${(stepNumber / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
        {step === 1 && <StepJobType onSelect={handleJobType} />}
        {step === 2 && jobType && <StepSeverity jobType={jobType} onSelect={handleSeverity} />}
        {step === 3 && <StepAccess onSelect={handleAccess} />}
        {step === 'results' && estimate && jobType && severity && access && (
          <>
            <ResultsCard
              estimate={estimate}
              jobType={jobType}
              severity={severity}
              access={access}
            />
            <div className="mt-6">
              <LeadCaptureForm
                estimate={estimate}
                jobType={jobType}
                severity={severity}
                access={access}
                onSubmit={handleLeadSubmit}
              />
            </div>
          </>
        )}
        {step === 'thankyou' && <ThankYou />}
      </div>
    </div>
  )
}
