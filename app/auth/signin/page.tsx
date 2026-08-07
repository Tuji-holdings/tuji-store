'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    })

    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
    } else if (result?.ok) {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-tuji-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="tuji-card">
          <h1 className="text-3xl font-bold text-tuji-light mb-6 text-center">Sign In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-tuji-light mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-background text-tuji-light border border-tuji-gold/30 focus:border-tuji-gold outline-none transition"
                placeholder="admin@tuji.local"
                required
              />
            </div>

            <div>
              <label className="block text-tuji-light mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-background text-tuji-light border border-tuji-gold/30 focus:border-tuji-gold outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-tuji-primary disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-tuji-gold/20">
            <p className="text-tuji-light/60 text-sm text-center">Demo credentials:</p>
            <p className="text-tuji-light text-sm text-center mt-2">
              Email: <span className="tuji-gold-text">admin@tuji.local</span><br />
              Password: <span className="tuji-gold-text">password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
