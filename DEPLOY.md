# Vercel Deployment Guide

## Prerequisites

- PostgreSQL database (e.g. Vercel Postgres, Neon, Supabase)
- Vercel account

## Environment Variables

Set these in Vercel Project Settings → Environment Variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string. For serverless, use a pooled connection (e.g. `?pgbouncer=true` with Neon, or Prisma Accelerate). |
| `APP_URL` | Yes | Your deployed URL, e.g. `https://your-app.vercel.app`. Used by better-auth for callbacks and CORS. |
| `BETTER_AUTH_SECRET` | Yes | Secret for session signing. Generate with `openssl rand -base64 32`. |
| `GOOGLE_CLIENT_ID` | If using Google | OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | If using Google | OAuth client secret |

## Database

1. Run migrations before first deploy or set up a migration step:
   ```bash
   npx prisma migrate deploy
   ```
2. For serverless, prefer a **connection pooler** in `DATABASE_URL` to avoid connection limits (e.g. Neon's pooled URL, Supabase's transaction pooler, or Prisma Accelerate).

## Deploy

```bash
vercel
```

Or connect your Git repo in the Vercel dashboard for automatic deploys.
