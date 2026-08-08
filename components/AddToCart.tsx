"use client"

import { useState } from 'react'

export default function AddToCart({ product, variant }: any) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function add() {
    const quantity = Math.max(1, Math.min(variant.inventory || 99, Math.floor(Number(qty) || 1)))
    const raw = localStorage.getItem('cart')
    const cart = raw ? JSON.parse(raw) : []
    const existing = cart.find((item: any) => item.variantId === variant.id)

    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, variant.inventory || 99)
    } else {
      cart.push({
        variantId: variant.id,
        name: `${product.name} — ${variant.name || variant.sku}`,
        quantity,
        unitCents: variant.priceCents
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    setQty(1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <label htmlFor={`qty-${variant.id}`} className="sr-only">Quantity</label>
        <input
          id={`qty-${variant.id}`}
          type="number"
          value={qty}
          min={1}
          max={variant.inventory || 99}
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-20 rounded border border-tuji-gold/30 bg-tuji-dark px-2 py-2 text-tuji-light"
        />
        <button onClick={add} disabled={!variant.inventory} className="rounded bg-tuji-gold px-4 py-2 font-semibold text-tuji-dark disabled:cursor-not-allowed disabled:opacity-50">
          {variant.inventory ? (added ? 'Added ✓' : 'Add to cart') : 'Out of stock'}
        </button>
      </div>
    </div>
  )
}
