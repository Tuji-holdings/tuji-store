import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminPage(){
  const products = await prisma.product.findMany({ include: { variants: true } })
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' }, take: 20 })

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Admin</h1>
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Products</h2>
        <ul className="grid grid-cols-1 gap-4">
          {products.map(p => (
            <li key={p.id} className="rounded border p-4">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-gray-600">{p.slug}</div>
                </div>
                <div>
                  <Link href={`/product/${p.slug}`} className="text-blue-600">View</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
        <ul>
          {orders.map(o => (
            <li key={o.id} className="mb-2 rounded border p-3">
              <div className="flex justify-between">
                <div>
                  <div className="font-medium">Order {o.id}</div>
                  <div className="text-sm">Total: ${(o.totalCents/100).toFixed(2)} • {o.status}</div>
                </div>
                <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
