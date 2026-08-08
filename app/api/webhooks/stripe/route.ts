import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ received: false }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ received: false }, { status: 400 })

  const text = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(text, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (error) {
    console.error('Webhook signature verification failed.', error)
    return NextResponse.json({ received: false }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId
    if (orderId) {
      const order = await prisma.order.findUnique({ where: { id: orderId } })
      if (order && order.status !== 'PAID') {
        const items = await prisma.orderItem.findMany({ where: { orderId } })
        await prisma.$transaction(async (tx) => {
          for (const item of items) {
            const updated = await tx.productVariant.updateMany({
              where: { id: item.variantId, inventory: { gte: item.quantity } },
              data: { inventory: { decrement: item.quantity } }
            })
            if (updated.count !== 1) throw new Error(`Insufficient inventory for ${item.variantId}`)
          }
          await tx.order.update({ where: { id: orderId }, data: { status: 'PAID' } })
        })
      }
    }
  }

  return NextResponse.json({ received: true })
}
