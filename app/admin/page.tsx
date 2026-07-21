import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function AdminPage(){
  const session = await getServerSession(authOptions)
  
  // Protect admin route - only ADMIN role can access
  if (!session || session.user?.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  const products = await prisma.product.findMany({ include: { variants: true } })
  const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' }, take: 20 })

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-gray-600">Logged in as: {session.user?.email}</div>
      </div>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">Products ({products.length})</h2>
        <ul className="grid grid-cols-1 gap-4">
          {products.length === 0 ? (
            <li className="rounded border p-4 text-gray-500">No products yet</li>
          ) : (
            products.map(p => (
              <li key={p.id} className="rounded border p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.slug} • ${(p.priceCents/100).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{p.variants.length} variants</div>
                  </div>
                  <div>
                    <Link href={`/product/${p.slug}`} className="text-blue-600 hover:underline">View</Link>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Recent Orders ({orders.length})</h2>
        {orders.length === 0 ? (
          <div className="rounded border p-4 text-gray-500">No orders yet</div>
        ) : (
          <ul>
            {orders.map(o => (
              <li key={o.id} className="mb-2 rounded border p-3">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">Order {o.id.substring(0, 8)}</div>
                    <div className="text-sm">Total: ${(o.totalCents/100).toFixed(2)} • Status: <span className="font-semibold">{o.status}</span></div>
                  </div>
                  <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
