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

## Owner Portal (Client Dashboard)
The client dashboard lives at **`/owner`** and is wired to Supabase tables. It is **read‑only for clients** except for safe settings in `agent_settings`.

### Core flow
1) Agent writes logs → `POST /api/agent/log`
2) Supabase stores runs/tasks/leads
3) `/api/owner/summary` powers the `/owner` UI
4) Proof links (CSV/asset) are stored in `proof_url` and rendered as **View proof**.

### Endpoints
- `POST /api/agent/log` — agent writes runs/tasks/leads (service‑role; optionally gated by `AGENT_LOG_SECRET`)
- `GET /api/owner/summary` — dashboard data (metrics, tasks, leads, settings)
- `POST /api/owner/settings` — update safe settings only

### Tables (Supabase)
- `clients`, `agents`
- `agent_runs`, `agent_tasks`
- `leads`, `conversations`, `meetings`
- `agent_settings`

### Environment
- `AGENT_LOG_SECRET` — optional header secret for `/api/agent/log`
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — service role for server writes

## Notes
- Design theme: premium dark with Miami F1 blue/pink accents (portal) + clean white marketing site.
- Lead Intake is 2-step with client-side Zod validation, success/error states, and honeypot field.
- If `next build` warns about inferring workspace root because of `/Users/finlaysturzaker/package-lock.json`, you can safely remove that file if it is not needed; the project itself uses pnpm with its own lockfile.

