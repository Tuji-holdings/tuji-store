import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Payments are not configured' }, { status: 503 })
    }

    const body = await req.json()
    const items = Array.isArray(body?.items) ? body.items : []
    if (!items.length) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })

    const requested = items
      .filter((item: any) => typeof item?.variantId === 'string' && Number.isInteger(item?.quantity) && item.quantity > 0)
      .map((item: any) => ({ variantId: item.variantId, quantity: Math.min(item.quantity, 99) }))
    if (!requested.length) return NextResponse.json({ error: 'Invalid cart items' }, { status: 400 })

    const variants = await prisma.productVariant.findMany({
      where: { id: { in: requested.map((item) => item.variantId) } },
      include: { product: true }
    })

    if (variants.length !== requested.length) {
      return NextResponse.json({ error: 'One or more products are no longer available' }, { status: 400 })
    }

    const variantById = new Map(variants.map((variant) => [variant.id, variant]))
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []
    const orderItemsData: { variantId: string; quantity: number; unitCents: number }[] = []
    let total = 0

    for (const item of requested) {
      const variant = variantById.get(item.variantId)
      if (!variant || variant.inventory < item.quantity) {
        return NextResponse.json({ error: `Insufficient inventory for ${variant?.product.name || 'a product'}` }, { status: 400 })
      }
      total += variant.priceCents * item.quantity
      orderItemsData.push({ variantId: variant.id, quantity: item.quantity, unitCents: variant.priceCents })
      lineItems.push({
        price_data: {
          currency: 'zar',
          unit_amount: variant.priceCents,
          product_data: { name: `${variant.name || variant.sku} — ${variant.product.name}` }
        },
        quantity: item.quantity
      })
    }

    const baseUrl = process.env.NEXTAUTH_URL
    if (!baseUrl) return NextResponse.json({ error: 'Store URL is not configured' }, { status: 503 })

    const order = await prisma.order.create({
      data: { totalCents: total, status: 'PENDING', items: { create: orderItemsData } }
    })

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        metadata: { orderId: order.id },
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/cart`
      })
      return NextResponse.json({ url: session.url })
    } catch (error) {
      await prisma.order.delete({ where: { id: order.id } }).catch(() => undefined)
      throw error
    }
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Unable to start checkout' }, { status: 500 })
  }
}
