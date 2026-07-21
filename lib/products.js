import { prisma } from './prisma'

export async function saveProduct(product) {
  console.log("Saving product:", product.name)
  
  try {
    const saved = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug || product.name.toLowerCase().replace(/\s+/g, '-'),
        description: product.description,
        priceCents: product.priceCents,
        images: product.images || [],
        variants: product.variants ? {
          create: product.variants
        } : undefined
      },
      include: { variants: true }
    })
    
    console.log("Product saved successfully:", saved.id)
    return saved
  } catch (error) {
    console.error("Error saving product:", error)
    throw error
  }
}
