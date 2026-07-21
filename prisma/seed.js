const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding TujiSa database...')
  
  // Create admin user
  const hashedPassword = await bcrypt.hash('password123', 10)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tuji.local' },
    update: {},
    create: {
      email: 'admin@tuji.local',
      password: hashedPassword,
      name: 'TujiSa Admin',
      role: 'ADMIN'
    }
  })
  console.log('✅ Admin user created:', adminUser.email)

  // Create sample products
  const products = [
    {
      name: 'Premium Wireless Headphones',
      slug: 'premium-wireless-headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      priceCents: 12999,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop']
    },
    {
      name: 'Smart Watch Pro',
      slug: 'smart-watch-pro',
      description: 'Advanced fitness tracking and notifications',
      priceCents: 29999,
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop']
    },
    {
      name: 'USB-C Power Bank',
      slug: 'usb-c-power-bank',
      description: 'Fast charging 30000mAh capacity',
      priceCents: 4999,
      images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop']
    },
    {
      name: 'Mechanical Keyboard',
      slug: 'mechanical-keyboard',
      description: 'RGB backlit mechanical switches',
      priceCents: 8999,
      images: ['https://images.unsplash.com/photo-1587829191301-64cc79e59556?w=500&h=500&fit=crop']
    }
  ]

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: {
        ...productData,
        variants: {
          create: [
            { sku: `${productData.slug.toUpperCase()}-1`, priceCents: productData.priceCents, inventory: 50 }
          ]
        }
      },
      include: { variants: true }
    })
    console.log(`✅ Product created: ${product.name}`)
  }

  console.log('\n🎉 Seeding complete!')
  console.log('\n📧 Admin Credentials:')
  console.log('   Email: admin@tuji.local')
  console.log('   Password: password123')
  console.log('\n⚠️  Change these credentials in production!')
}

main()
  .catch(e => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
