'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-tuji-dark flex items-center justify-center px-4">
      <div className="tuji-card max-w-md text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-tuji-light mb-4">Payment Successful!</h1>
        <p className="text-tuji-light/70 mb-6">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        
        {sessionId && (
          <p className="text-tuji-light/50 text-sm mb-6">
            Session ID: <span className="tuji-gold-text">{sessionId}</span>
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Link href="/" className="btn-tuji-primary justify-center">
            ← Back to Home
          </Link>
          <Link href="/products" className="btn-tuji-secondary justify-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
