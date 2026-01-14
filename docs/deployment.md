Deployment steps — Vercel + GitHub + GoDaddy

1) Overview ✅
- We'll connect this GitHub repo to Vercel (recommended) and use a CI workflow to run tests, run Prisma migrations and the seed script, then allow Vercel to perform the build & deploy.
- Final domain: **tujiholings.online** (GoDaddy) — we'll add DNS records to point to Vercel.

2) Required production secrets
- DATABASE_URL — reachable production DB (Postgres is recommended; do NOT use SQLite in production)
- NEXTAUTH_URL — https://tujiholings.online
- NEXTAUTH_SECRET — a secure random value
- STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- (Optional) VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID — only if you want the workflow to trigger/wait for Vercel deploys

Create these as GitHub repository secrets (Settings → Secrets → Actions) and in the Vercel Project Environment settings.

3) Create a production database
- Recommended: use a managed Postgres (Supabase, Railway, Render, Neon, etc.).
- Example: set DATABASE_URL to a Postgres URL and add that secret to GitHub and Vercel.

4) GitHub Actions workflow
- A workflow file is added at `.github/workflows/ci-deploy.yml`.
- Behavior: on push to `main` (or manual dispatch): runs lint & build, runs `npx prisma migrate deploy`, runs `node prisma/seed.js`, then optionally triggers a Vercel deployment (if Vercel secrets present).
- Ensure the `DATABASE_URL` secret points to your production DB before merging to `main`.

5) Connect Vercel to GitHub
- In Vercel dashboard: "Import Project" → choose this GitHub repo → Configure
- Build Command: `npm run build`
- Output Directory: (leave blank; Next will handle output)
- Add environment variables in Vercel (same ones as GitHub) for `Production` and `Preview` as needed

6) Add custom domain in Vercel & update GoDaddy DNS
- In Vercel: go to your Project → Settings → Domains → Add `tujiholings.online`
- Vercel will show DNS instructions. For a GoDaddy-managed domain you can add the following records:
  - A record — Host: @ → Value: 76.76.21.21 → TTL: default
  - CNAME record — Host: www → Value: cname.vercel-dns.com → TTL: default
- Optionally, add a TXT verification record if Vercel asks for it.
- Wait until Vercel verifies the domain (it can take up to a few minutes depending on DNS propagation).

7) Final checks after deploy
- Confirm the site loads on `https://tujiholings.online`
- Sign in to `/admin` using `admin@tuji.local` / `password123` (seeded user) — change password and create a proper admin account immediately
- Verify Stripe endpoints in `app/api/webhooks/stripe/route.ts` and update live keys in Vercel (do not publish secret keys in the repo)
- Run a quick purchase flow with test Stripe keys in place

8) Rollback plan
- If a migration fails, restore DB from backup or use the DB provider's rollback features. Don't run destructive migrations without a backup.

9) Notes & tips
- Do not put production secrets in the repo. Use GitHub Secrets and Vercel Environment Variables.
- For zero-downtime DB migrations, consider non-blocking additive migrations and background jobs for data backfills.

If you want, I'll:
- create a `chore/ci-deploy` branch, commit the workflow & docs, and open a PR for review ✅
- prepare a short "Release notes" entry summarizing the deployment changes ✅
- walk you through adding the DNS records in your GoDaddy account (I can provide step-by-step UI instructions)
