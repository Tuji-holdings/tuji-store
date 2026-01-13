"use client"

import { useState } from 'react'

export default function AddToCart({ product, variant }: any){
  const [qty, setQty] = useState(1)
  function add(){
    const raw = localStorage.getItem('cart')
    const cart = raw ? JSON.parse(raw) : []
    cart.push({ variantId: variant.id, name: `${product.name} — ${variant.name||variant.sku}`, quantity: qty, unitCents: variant.priceCents })
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <input type="number" value={qty} min={1} onChange={e=>setQty(Number(e.target.value))} className="w-20 rounded border px-2 py-1" />
        <button onClick={add} className="rounded bg-blue-600 px-4 py-2 text-white">Add to cart</button>
      </div>
    </div>
  )
}
