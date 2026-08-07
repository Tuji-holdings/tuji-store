'use client'

import Header from '@/components/Header'
import ProductList from '@/components/ProductList'

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="text-4xl font-bold text-tuji-light mb-12 text-center">
            All <span className="tuji-gradient-text">Products</span>
          </h1>
          <ProductList />
        </div>
      </main>
    </>
  )
}
