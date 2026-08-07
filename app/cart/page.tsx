'use client'

import Header from '@/components/Header'
import Cart from '@/components/Cart'

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-2xl px-8">
          <h1 className="text-4xl font-bold text-tuji-light mb-8">Shopping Cart</h1>
          <Cart />
        </div>
      </main>
    </>
  )
}
