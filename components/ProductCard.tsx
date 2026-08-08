'use client'

import Image from 'next/image'
import AddToCart from './AddToCart'

export default function ProductCard({ id, name, description, images, variants }: any) {
  const mainVariant = variants?.[0]
  const price = mainVariant?.priceCents ? (mainVariant.priceCents / 100).toFixed(2) : '0.00'
  const imageUrl = images?.[0]

  return (
    <div className="tuji-card">
      <div className="relative w-full h-48 mb-4 bg-background rounded overflow-hidden">
        {imageUrl ? <Image src={imageUrl} alt={name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover hover:scale-105 transition-transform duration-300" /> : <div className="h-full flex items-center justify-center text-tuji-light/40">No image</div>}
        <div className="absolute top-3 right-3 bg-tuji-gold text-tuji-dark px-3 py-1 rounded-full font-semibold">R{price}</div>
      </div>
      <h3 className="text-lg font-semibold text-tuji-light mb-2">{name}</h3>
      <p className="text-tuji-light/60 text-sm mb-4 line-clamp-2">{description}</p>
      {mainVariant && <><div className="text-xs text-tuji-light/50 mb-4">SKU: {mainVariant.sku}</div><AddToCart product={{ id, name }} variant={mainVariant} /></>}
    </div>
  )
}
