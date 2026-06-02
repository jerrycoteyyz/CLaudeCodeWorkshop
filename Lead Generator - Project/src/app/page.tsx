import CalculatorWizard from '@/components/CalculatorWizard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero */}
      <div className="px-4 pt-14 pb-10 text-center">
        <p className="text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">
          Free Instant Estimate
        </p>
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          How Much Is Your<br />
          <span className="text-blue-400">Plumbing Problem</span><br />
          Going to Cost?
        </h1>
        <p className="text-slate-400 text-lg max-w-sm mx-auto">
          Answer 3 quick questions and get a real price range — no call needed, no BS.
        </p>
      </div>

      {/* Calculator */}
      <div className="px-4 pb-16">
        <CalculatorWizard />
      </div>

      {/* Footer */}
      <div className="text-center pb-10 px-4">
        <p className="text-slate-500 text-sm">
          Prefer to just call?{' '}
          <a href="tel:9733497885" className="text-blue-400 font-semibold hover:underline">
            973-349-7885
          </a>
        </p>
        <p className="text-slate-600 text-xs mt-2">© {new Date().getFullYear()} Dumb Plumbing. All rights reserved.</p>
      </div>
    </main>
  )
}
