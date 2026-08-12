# Portfolio + Custom CMS

Portfolio pribadi Achmad Ridho dengan CMS built-in.

## Stack

- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- Supabase Postgres + Storage (+ Prisma ORM)
- Auth.js (credentials, single admin)
- Resend (notifikasi pesan contact)
- Deploy: Vercel

## Setup lokal

1. `npm install`
2. Salin `.env.example` ke `.env` dan isi semua nilai
3. `npx prisma migrate dev` + `npx prisma db seed`
4. `npm run dev` → http://localhost:3000

Admin di `/admin` (login dengan `ADMIN_EMAIL`/`ADMIN_PASSWORD`).

## Database setup di lingkungan CI

Di jaringan yang memblokir port Postgres, gunakan workflow GitHub Actions
`.github/workflows/database-setup.yml` (manual trigger) dengan secrets:
`DATABASE_URL`, `DIRECT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.