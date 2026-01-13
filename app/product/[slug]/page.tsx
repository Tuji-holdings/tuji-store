import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import AddToCart from '@/components/AddToCart'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({ where: { slug: params.slug }, include: { variants: true } })
  if (!product) return <div>Product not found</div>

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="flex gap-8">
        <div className="w-1/3">
          <Image src={product.images[0] || '/vercel.svg'} alt={product.name} width={400} height={400} />
        </div>
        <div className="w-2/3">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-gray-700">{product.description}</p>
          <div className="mt-4 text-xl font-semibold">${(product.priceCents/100).toFixed(2)}</div>
                  <div className="mt-6">
            {product.variants[0] ? (
              // @ts-ignore - server to client prop
              <AddToCart product={product} variant={product.variants[0]} />
            ) : (
              <div>No variants</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
