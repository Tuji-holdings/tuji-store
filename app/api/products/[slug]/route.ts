import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug
  const product = await prisma.product.findUnique({ where: { slug }, include: { variants: true } })
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}
