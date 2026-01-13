import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })

export async function POST(req: Request) {
  const body = await req.json()
  const { items } = body
  if (!items || !Array.isArray(items)) return NextResponse.json({ error: 'Invalid items' }, { status: 400 })

  // create a pending order in our DB to track the checkout
  let total = 0
  const orderItemsData = []
  for (const it of items) {
    const variant = await prisma.productVariant.findUnique({ where: { id: it.variantId } })
    if (!variant) continue
    total += variant.priceCents * it.quantity
    orderItemsData.push({ variantId: variant.id, quantity: it.quantity, unitCents: variant.priceCents })
  }

  const order = await prisma.order.create({
    data: {
      totalCents: total,
      status: 'PENDING',
      items: { create: orderItemsData }
    }
  })

  const line_items = []
  for (const it of items) {
    const variant = await prisma.productVariant.findUnique({ where: { id: it.variantId }, include: { product: true } })
    if (!variant) continue
    line_items.push({
      price_data: {
        currency: 'usd',
        unit_amount: variant.priceCents,
        product_data: { name: `${variant.name || variant.sku} — ${variant.product.name}` }
      },
      quantity: it.quantity
    })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items,
    metadata: { orderId: order.id },
    success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`
  })

  return NextResponse.json({ url: session.url })
}
