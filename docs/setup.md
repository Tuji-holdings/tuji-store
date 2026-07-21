# TujiSa Store - Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Setup Database
```bash
# Generate Prisma client
npx prisma generate

# Create database schema
npx prisma db push --accept-data-loss

# Seed with demo data
npm run seed
```

### 4. Run Dev Server
```bash
npm run dev
```

Visit http://localhost:3000

## Default Admin Credentials
- Email: `admin@tuji.local`
- Password: `password123`

⚠️ Change these immediately in production!

## Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
app/
  ├── page.tsx              # Home page
  ├── layout.tsx            # Root layout
  ├── globals.css           # TujiSa theme & styles
  ├── cart/
  ├── products/
  ├── product/[slug]/       # Product detail
  ├── about/
  ├── contact/
  ├── auth/                 # Authentication pages
  ├── admin/                # Admin dashboard (protected)
  └── api/
      ├── products/         # Product API
      ├── auth/             # NextAuth
      └── checkout/         # Stripe checkout

components/
  ├── Header.tsx            # Navigation
  ├── Hero.tsx              # Hero section
  ├── ProductCard.tsx       # Product cards
  └── ProductList.tsx       # Product grid

prisma/
  ├── schema.prisma         # Database schema
  └── seed.js               # Seed script

lib/
  ├── prisma.ts             # Prisma client
  └── products.js           # Product utilities
```

## Key Features

✅ **Authentication**: NextAuth with JWT
✅ **Admin Dashboard**: Role-based access control
✅ **Stripe Integration**: Payment processing
✅ **Product Catalog**: Dynamic product pages
✅ **Shopping Cart**: Client-side state management
✅ **TujiSa Branding**: Golden/Black theme
✅ **Responsive Design**: Mobile-friendly
✅ **CI/CD**: GitHub Actions workflow

## Development Commands

```bash
# Dev server
npm run dev

# Build
npm run build

# Production server
npm start

# Lint
npm run lint

# Prisma
npx prisma generate    # Generate client
npx prisma db push     # Sync schema
npx prisma studio     # Open data browser
npm run seed          # Seed database

# Migrations (production)
npx prisma migrate deploy
npx prisma migrate dev --name "description"
```

## Styling

TujiSa theme uses Tailwind CSS with custom colors:

```css
--tuji-gold: #FFC107
--tuji-dark: #1A1A1A
--tuji-accent: #FFA500
--tuji-light: #F5F5F5
```

Use utility classes:
- `.tuji-gold-text` - Golden text
- `.tuji-card` - Styled card
- `.btn-tuji-primary` - Primary button
- `.btn-tuji-secondary` - Secondary button
- `.tuji-gradient-text` - Gradient text effect

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/[slug]` - Get product by slug

### Auth
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session

### Checkout
- `POST /api/checkout` - Create Stripe checkout session

## Support

For issues or questions:
1. Check the docs folder
2. Review GitHub issues
3. Contact support@tujiholdings.online
