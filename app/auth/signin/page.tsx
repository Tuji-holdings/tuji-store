'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Header from '@/components/Header'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@tuji.local')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-tuji-dark border-2 border-tuji-gold/30 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="text-tuji-gold font-bold text-3xl mb-2">TujiSa</div>
              <h1 className="text-2xl font-bold text-tuji-light">Sign In</h1>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-tuji-light mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-tuji-gold/30 rounded text-tuji-light focus:border-tuji-gold outline-none transition"
                  placeholder="admin@tuji.local"
                />
              </div>

              <div>
                <label className="block text-tuji-light mb-2 font-semibold">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-tuji-gold/30 rounded text-tuji-light focus:border-tuji-gold outline-none transition"
                  placeholder="password123"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-tuji-primary justify-center disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center text-tuji-light/60 text-sm">
              <p>Demo Credentials:</p>
              <p className="text-tuji-gold mt-2">Email: admin@tuji.local</p>
              <p className="text-tuji-gold">Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
