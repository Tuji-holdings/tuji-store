"use client"

import { useState, useEffect } from 'react'

export default function Cart() {
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setCart(JSON.parse(raw))
    } catch {
      localStorage.removeItem('cart')
    }
  }, [])

  function remove(index: number) {
    const next = cart.filter((_, i) => i !== index)
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  async function checkout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ items: cart })
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Unable to start checkout')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start checkout')
      setLoading(false)
    }
  }

  if (!cart.length) return <div className="rounded-lg border border-tuji-gold/20 p-8 text-center text-tuji-light/70">Your cart is empty.</div>
  const total = cart.reduce((sum, item) => sum + (item.quantity * item.unitCents), 0)

  return (
    <div>
      <ul className="divide-y divide-tuji-gold/10">
        {cart.map((item, index) => (
          <li key={`${item.variantId}-${index}`} className="flex justify-between gap-4 py-4 text-tuji-light">
            <div>{item.name} × {item.quantity}</div>
            <div className="flex items-center gap-4">
              <div>R{(item.unitCents / 100).toFixed(2)}</div>
              <button onClick={() => remove(index)} className="text-sm text-red-400 hover:text-red-300">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between text-lg font-semibold text-tuji-light">Total: R{(total / 100).toFixed(2)}</div>
      {error && <p role="alert" className="mt-4 rounded bg-red-950/40 p-3 text-sm text-red-300">{error}</p>}
      <button onClick={checkout} disabled={loading} className="mt-5 w-full rounded bg-tuji-gold px-4 py-3 font-semibold text-tuji-dark disabled:opacity-50">
        {loading ? 'Opening secure checkout…' : 'Checkout securely'}
      </button>
    </div>
  )
}
