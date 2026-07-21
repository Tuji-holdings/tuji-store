# TujiSa Store - Deployment Guide

## Environment Variables

### Required for Production

```bash
# Database (use PostgreSQL, not SQLite)
DATABASE_URL="postgresql://user:password@host:5432/tuji_store"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here" # Generate: openssl rand -base64 32
NEXTAUTH_URL="https://your-domain.com"

# Stripe
STRIPE_SECRET_KEY="sk_live_your_stripe_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

## Deployment Steps

### 1. Database Setup

- Create PostgreSQL database (Vercel Postgres, Railway, Supabase, etc.)
- Update `DATABASE_URL` with your connection string
- Run migrations:
  ```bash
  npx prisma migrate deploy
  npx prisma db seed
  ```

### 2. Vercel Deployment

1. Connect GitHub repo to Vercel
2. Add environment variables in Project Settings
3. Deploy (automatic on push to main)

### 3. Stripe Setup

1. Create Stripe account
2. Get live API keys from Dashboard
3. Set up webhook for `/api/webhooks/stripe`
4. Add webhook secret to environment

### 4. GitHub Secrets

Add to repository Settings → Secrets & Variables → Actions:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `STRIPE_SECRET_KEY`
- `VERCEL_TOKEN` (optional, for automated deploy)
- `VERCEL_ORG_ID` (optional)
- `VERCEL_PROJECT_ID` (optional)

## First Launch Checklist

- [ ] PostgreSQL database created and connected
- [ ] Prisma migrations run (`npx prisma migrate deploy`)
- [ ] Database seeded with admin user
- [ ] Stripe account setup with live keys
- [ ] Environment variables configured in Vercel
- [ ] Domain connected to Vercel
- [ ] SSL certificate auto-provisioned
- [ ] Admin login tested (`admin@tuji.local` / `password123`)
- [ ] Product can be added to cart
- [ ] Checkout flow tested with test Stripe card
- [ ] Admin password changed from default
- [ ] GitHub Actions workflow triggered successfully

## Post-Launch

- Monitor Vercel Analytics
- Set up error tracking (Sentry, LogRocket, etc.)
- Configure email notifications for orders
- Add real products to database
- Update branding and content
- Set up backup strategy

## Troubleshooting

### Build fails: "Cannot find module"
- Run `npm ci` locally to verify
- Check all dependencies in `package.json`

### Database connection error
- Verify `DATABASE_URL` format
- Test connection string locally
- Check IP allowlist on database provider

### Stripe not working
- Verify API keys are correct
- Check webhook endpoint is accessible
- Test with Stripe test cards

### Admin login failing
- Run `npx prisma db seed` to recreate admin user
- Check `NEXTAUTH_SECRET` is set correctly
