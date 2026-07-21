# Tuji Store Launch Checklist

## Pre-Launch (Critical)

- [ ] **Database Setup**
  - [ ] Create PostgreSQL database (not SQLite)
  - [ ] Update `DATABASE_URL` in Vercel/GitHub secrets
  - [ ] Test connection locally: `DATABASE_URL="..." npx prisma db push`

- [ ] **Stripe Configuration**
  - [ ] Create Stripe account (if not done)
  - [ ] Get live API keys (not test keys)
  - [ ] Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to secrets
  - [ ] Set up webhook: POST endpoint at `/api/webhooks/stripe`
  - [ ] Add `STRIPE_WEBHOOK_SECRET` to environment

- [ ] **Authentication Secrets**
  - [ ] Generate strong `NEXTAUTH_SECRET` (e.g., `openssl rand -base64 32`)
  - [ ] Add to Vercel + GitHub secrets
  - [ ] Set `NEXTAUTH_URL` to your production domain

- [ ] **Domain Setup**
  - [ ] Register domain (e.g., tujiholings.online)
  - [ ] Point DNS to Vercel (update A record and CNAME)
  - [ ] Verify SSL certificate auto-provisioned by Vercel

- [ ] **Code Deployment**
  - [ ] Push to `main` branch
  - [ ] GitHub Actions workflow completes successfully
  - [ ] Vercel deployment succeeds
  - [ ] No build errors in logs

## Post-Deploy (Verification)

- [ ] **Site Access**
  - [ ] Site loads at production domain
  - [ ] Home page displays sample products
  - [ ] Product pages load correctly

- [ ] **Authentication**
  - [ ] Admin login works (`admin@tuji.local` / `password123`)
  - [ ] **Change admin password immediately**
  - [ ] Customer signup/login functional

- [ ] **Admin Dashboard**
  - [ ] Admin panel accessible at `/admin`
  - [ ] Customer users blocked from `/admin`
  - [ ] Products list displays seeded sample products
  - [ ] Orders list visible (empty if no purchases yet)

- [ ] **Payment Flow**
  - [ ] Add product to cart
  - [ ] Checkout redirects to Stripe
  - [ ] Payment succeeds (test card: 4242 4242 4242 4242)
  - [ ] Order appears in admin dashboard
  - [ ] Database updated with order

- [ ] **Security**
  - [ ] HTTPS enabled (green lock icon)
  - [ ] No hardcoded secrets in code
  - [ ] All environment variables in secrets manager
  - [ ] Admin page requires authentication
  - [ ] Stripe webhook signature verified

## Post-Launch (Operations)

- [ ] Set up monitoring (Vercel Analytics, error tracking)
- [ ] Configure email notifications for orders (optional)
- [ ] Add real products to database
- [ ] Update branding (colors, images, text)
- [ ] Enable analytics (Google Analytics, etc.)
- [ ] Set up backup strategy for database
- [ ] Create runbook for common tasks

## Rollback Plan

If issues arise:
1. Verify environment variables are correct
2. Check Vercel deployment logs
3. Check GitHub Actions workflow logs
4. Revert to previous commit if needed: `git revert <commit-hash>`
5. Contact support for critical issues
