# TujiSa Store

Next.js 14 + Prisma + Stripe e-commerce storefront.

## Production requirements

- Vercel deployment connected to this repository
- Managed PostgreSQL database
- `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Live Stripe keys and `STRIPE_WEBHOOK_SECRET`
- Stripe webhook configured for `/api/webhooks/stripe`

Never use SQLite or Stripe test keys in production.

## Environment variables

See `.env.example`. `NEXTAUTH_URL` must be the public HTTPS store URL.

## Local development

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

The seed script creates sample products and a development admin account. Do not use the seeded password in production; replace production credentials before launch.

## Validation

```bash
npx prisma generate
npx tsc --noEmit
npm run build
```

## Checkout

Checkout prices and inventory are read from the database server-side; client-submitted prices are not trusted. Successful Stripe checkout is finalized by the signed webhook, which also decrements inventory transactionally.
