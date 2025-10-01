
# Digital Illustrations Marketplace — Animated Edition

- Next.js App Router, TailwindCSS, Prisma + PostgreSQL
- Animated landing page (Framer Motion), modern UI/UX
- Products with upload + cart + orders
- **Runs 100% even without DB** (products page falls back to mock data until you set `DATABASE_URL`).

## Quick Start (no DB)
```bash
npm install
npm run dev
# open http://localhost:3000 and http://localhost:3000/products
```

## Enable Full DB Features
```bash
cp .env.example .env
# set DATABASE_URL and JWT_SECRET

# or launch Postgres quickly
docker compose up -d

npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.mjs
npm run dev
```
