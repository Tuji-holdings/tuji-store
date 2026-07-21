'use client'

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-tuji-gold text-center py-8">Loading products...</div>

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-tuji-light/60">No products available yet</div>
        <div className="text-tuji-gold text-sm mt-2">Check back soon!</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
