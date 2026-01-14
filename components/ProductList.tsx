"use client"

import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function ProductList(): JSX.Element {
  const { data, error } = useSWR('/api/products', fetcher)
  if (error) return <div>Error loading products</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {data.map((p: any) => (
        <Link key={p.id} href={`/product/${p.slug}`} className="block rounded-lg border p-4 hover:shadow">
          <div className="mb-2 font-medium">{p.name}</div>
          <div className="text-sm text-gray-600">${(p.priceCents/100).toFixed(2)}</div>
        </Link>
      ))}
    </div>
  )
}
