# Temporary Utopia — Marketing Site

Conversion-first single-page site built with Next.js (App Router), Tailwind, shadcn/ui, Framer Motion, and Supabase.

## Quick start
- Install deps: `pnpm install`
- Copy envs: `cp .env.example .env` and fill `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- Run dev server: `pnpm dev`

## Scripts
- `pnpm dev` — run Next dev server
- `pnpm lint` — lint with Next ESLint preset
- `pnpm typecheck` — TypeScript no-emit
- `pnpm build` — production build

## Environment
- `NEXT_PUBLIC_SITE_URL` — base URL (used for meta)
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server-only; never expose to client)

## API contracts
- `POST /api/leads` — Zod-validated lead intake insert into `leads`
- `POST /api/insights` — Zod-validated email upsert into `insights_subscribers`

Both endpoints include honeypot + basic IP rate limiting and use the Supabase service client on the server.

## Database
Supabase migrations live in `supabase/migrations`:
- `leads` table
- `insights_subscribers` table
Both have RLS enabled with service-role insert/update policies only.

## Structure (key paths)
- `src/app/(marketing)/page.tsx` — single-page marketing experience
- `src/content/*` — data-driven content modules
- `src/components/sections/*` — Lead Intake + Insights forms
- `src/app/api/*` — API route handlers
- `src/lib/*` — env, supabase client, validators, analytics stub
- `src/components/reactbits/` — hero effect scaffold

## Notes
- Design theme: premium dark with Miami F1 blue/pink accents.
- Lead Intake is 2-step with client-side Zod validation, success/error states, and honeypot field.
- Insights signup is lightweight and reuseable (`<InsightsSignup compact />` supported).
- If `next build` warns about inferring workspace root because of `/Users/finlaysturzaker/package-lock.json`, you can safely remove that file if it is not needed; the project itself uses pnpm with its own lockfile.

