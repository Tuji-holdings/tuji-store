'use client'

import AddToCart from './AddToCart'

export default function ProductCard({ id, name, description, images, variants }: any) {
  const mainVariant = variants?.[0]
  const price = mainVariant?.priceCents ? (mainVariant.priceCents / 100).toFixed(2) : '0.00'
  const imageUrl = images?.[0] || 'https://via.placeholder.com/300x300?text=Product'

  return (
    <div className="tuji-card">
      <div className="relative w-full h-48 mb-4 bg-background rounded overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-tuji-gold text-tuji-dark px-3 py-1 rounded-full font-semibold">
          ${price}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-tuji-light mb-2">{name}</h3>
      <p className="text-tuji-light/60 text-sm mb-4 line-clamp-2">{description}</p>

      {mainVariant && (
        <>
          <div className="text-xs text-tuji-light/50 mb-4">SKU: {mainVariant.sku}</div>
          <AddToCart product={{ id, name }} variant={mainVariant} />
        </>
      )}
    </div>
  )
}
