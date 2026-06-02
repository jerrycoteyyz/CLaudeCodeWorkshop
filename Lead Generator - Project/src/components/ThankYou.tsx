'use client'

export default function ThankYou() {
  return (
    <div className="text-center py-4">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re all set!</h2>
      <p className="text-gray-500 mb-2">
        We&apos;ve sent your estimate and $50 off coupon to your inbox.
      </p>
      <p className="text-gray-500 mb-8">
        Ready to book? Give us a call and mention your coupon.
      </p>
      <a
        href="tel:9733497885"
        className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-5 rounded-2xl text-xl transition-colors duration-200"
      >
        📞 Call Dumb Plumbing Now
        <span className="block text-base font-normal mt-1 opacity-90">973-349-7885</span>
      </a>
      <p className="text-gray-400 text-xs mt-4">
        *$50 off valid on service calls booked within 7 days.
      </p>
    </div>
  )
}
