"use client"

import { useState, useEffect } from 'react'

export default function Cart() {
  const [cart, setCart] = useState<any[]>([])
  useEffect(() => {
    const raw = localStorage.getItem('cart')
    if (raw) setCart(JSON.parse(raw))
  }, [])

  function remove(index:number){
    const next = cart.slice()
    next.splice(index,1)
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  async function checkout(){
    const res = await fetch('/api/checkout', { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ items: cart }) })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  if (!cart.length) return <div>Your cart is empty</div>
  const total = cart.reduce((s:any,it:any)=> s + (it.quantity * it.unitCents),0)

  return (
    <div>
      <ul>
        {cart.map((it, idx) => (
          <li key={idx} className="flex justify-between py-2">
            <div>{it.name} x {it.quantity}</div>
            <div className="flex gap-4">
              <div>${(it.unitCents/100).toFixed(2)}</div>
              <button onClick={()=>remove(idx)} className="text-red-600">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold">Total: ${(total/100).toFixed(2)}</div>
      <button onClick={checkout} className="mt-4 rounded bg-green-600 px-4 py-2 text-white">Checkout</button>
    </div>
  )
}
