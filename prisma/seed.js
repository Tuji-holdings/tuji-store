const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  const hashed = await bcrypt.hash('password123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@tuji.local' },
    update: {},
    create: {
      email: 'admin@tuji.local',
      password: hashed,
      name: 'Admin',
      role: 'ADMIN'
    }
  })

  const product = await prisma.product.upsert({
    where: { slug: 'sample-tshirt' },
    update: {},
    create: {
      name: 'Sample T-Shirt',
      slug: 'sample-tshirt',
      description: 'A comfy sample t-shirt',
      priceCents: 2500,
      image: 'https://cdn.example.com/sample-tshirt.jpg',
      variants: {
        create: [
          { sku: 'TSHIRT-RED-S', name: 'Red / Small', priceCents: 2500, inventory: 10 },
          { sku: 'TSHIRT-BLUE-M', name: 'Blue / Medium', priceCents: 2500, inventory: 20 }
        ]
      }
    }
  })

  console.log('Seed done')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
