# TujiSa Store

A simple Next.js + Prisma + Stripe starter e-commerce app.

## ⚠️ Production Deployment Warning

**Do NOT use SQLite in production.** Use a managed PostgreSQL database. See [Deployment Guide](./docs/deployment.md).

## Local Setup

1. Copy `.env` and replace values (DATABASE_URL for production DB, STRIPE secrets, NEXTAUTH_SECRET):

   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="replace-me"
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
   NEXTAUTH_URL="http://localhost:3000"
   ```

2. Install dependencies and generate Prisma client:

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

## Features

- ✅ Product catalog with variants
- ✅ Shopping cart (client-side state)
- ✅ Stripe integration for payments
- ✅ User authentication (NextAuth + Credentials)
- ✅ Admin dashboard (role-based access)
- ✅ Order management
- ✅ Database seeding with sample data

## Default Admin User

After seeding, log in with:
- **Email:** `admin@tuji.local`
- **Password:** `password123`

⚠️ **Change this immediately after first login.**

## Admin Panel

Access the admin dashboard at `/admin` (authentication required, admin role only).

## Deploying

1. **Use Vercel** — recommended for Next.js:
   - Connect the repo in Vercel dashboard
   - Set up a managed PostgreSQL database (e.g., Vercel Postgres, Railway, Supabase)
   - Set environment variables in Vercel dashboard (see `.env` template above)

2. **GitHub Actions Workflow** — included:
   - Automatically runs on push to `main`
   - Runs lint/build → migrations → seed → Vercel deployment (optional)
   - Requires secrets: `DATABASE_URL`, `NEXTAUTH_SECRET`, `STRIPE_*` keys

3. **Database Setup:**
   ```
   # For production, use PostgreSQL
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

4. **Stripe Webhooks:**
   - Add `STRIPE_WEBHOOK_SECRET` to environment
   - Configure webhook endpoint in Stripe dashboard (e.g., `/api/webhooks/stripe`)

## Development

- Use `npx prisma studio` to manage data in development
- Schema: `prisma/schema.prisma`
- Seed script: `prisma/seed.js`
- Authentication: NextAuth with JWT strategy

## Support

For issues or questions, check the [deployment docs](./docs/deployment.md) or GitHub Issues.
