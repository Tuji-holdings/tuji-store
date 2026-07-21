'use client'

import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  description?: string
  priceCents: number
  images?: string[]
}

export default function ProductCard({ id, name, slug, description, priceCents, images }: ProductCardProps) {
  const imageUrl = images && images.length > 0 ? images[0] : '/placeholder.png'
  const price = (priceCents / 100).toFixed(2)

  return (
    <Link href={`/product/${slug}`}>
      <div className="tuji-card cursor-pointer group">
        <div className="relative mb-4 overflow-hidden rounded-lg h-48 bg-tuji-dark">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="text-lg font-semibold text-tuji-light group-hover:text-tuji-gold transition mb-2">{name}</h3>
        {description && <p className="text-tuji-light/60 text-sm mb-4 line-clamp-2">{description}</p>}
        <div className="flex items-center justify-between">
          <span className="text-2xl tuji-gradient-text font-bold">${price}</span>
          <span className="text-tuji-gold text-sm font-semibold group-hover:translate-x-1 transition">→</span>
        </div>
      </div>
    </Link>
  )
}
