import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-11-15' })

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') || ''
  const text = await req.text()

  // If webhook secret is not set, try to parse without verification (dev/test only)
  let event: Stripe.Event
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(text, sig, webhookSecret)
    } else {
      event = JSON.parse(text)
    }
  } catch (err) {
    console.error('Webhook signature verification failed.', err)
    return NextResponse.json({ received: false }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId
    if (orderId) {
      // mark order as paid and reduce inventory
      const order = await prisma.order.update({ where: { id: orderId }, data: { status: 'PAID' } })

      const orderItems = await prisma.orderItem.findMany({ where: { orderId: order.id } })
      for (const it of orderItems) {
        await prisma.productVariant.update({ where: { id: it.variantId }, data: { inventory: { decrement: it.quantity } } })
      }
    }
  }

  return NextResponse.json({ received: true })
}
