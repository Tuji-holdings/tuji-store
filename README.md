# TujiSa Store

A simple Next.js + Prisma + Stripe starter e-commerce app.

## Local setup

1. Copy `.env` and replace values (DATABASE_URL for production DB, STRIPE secrets, NEXTAUTH_SECRET):

   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="replace-me"
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   NEXTAUTH_URL="http://localhost:3000"
   ```

2. Install and generate Prisma client:

   ```
   npm install
   npx prisma generate
   npx prisma db push --accept-data-loss
   npm run seed
   ```

3. Start dev server:

   ```
   npm run dev
   ```

## Deploying

- I recommend deploying to Vercel — connect the repo and set environment variables in the Vercel dashboard.
- Add `STRIPE_WEBHOOK_SECRET` in your environment for webhook verification and set up the Stripe webhook endpoint (e.g., `/api/webhooks/stripe`).

## Notes

- Admin UI is available at `/admin` (server-side, no auth yet).
- Use `npx prisma studio` to quickly manage data in development.
