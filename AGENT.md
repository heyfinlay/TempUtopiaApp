# AGENT.MD — Temporary Utopia Website (Codex)
This repo is built by an autonomous coding agent (Codex). Follow this file exactly.


## 0) Mission
Build **Temporary Utopia’s conversion-first marketing website** from scratch (do NOT port the old prototype).
Primary goal: convert visitors into **qualified leads** via a structured intake form, and/or **book a call**.


## 1) Non-negotiables
- Use **Next.js (App Router) + TypeScript**.
- Use **TailwindCSS** + **shadcn/ui** components.
- Use **Framer Motion** for motion.
- Keep the site **one-page** (scroll narrative) for v1.
- Add a **Lead Intake** form capturing:
- Business name, employees, current ad spend (range), contact info, services interested
- Add **Insights email signup**.
- Build APIs server-side (no client-side DB access):
- `POST /api/leads`
- `POST /api/insights`
- Use **Supabase** for persistence (server insert with service role key).
- Ensure accessibility: proper labels, keyboard nav, focus states.
- Performance: do not ship heavy always-on animation; respect `prefers-reduced-motion`.


## 2) V1 UX structure (single page)
Sections, in this order:
1. Hero (positioning + primary CTA: Book Call + secondary CTA: Apply)
2. Journey (4-step overview with anchor links)
3. Problem
4. Approach (method, cadence)
5. Services
6. Portfolio (placeholder tiles; data-driven)
7. Trust (process + testimonials)
8. Conversion block (Lead Intake + Book a Call + Insights signup)
9. Footer


Navigation: sticky top nav with anchor links.


## 3) Design system requirements
- Theme: premium dark UI with soft rounded corners.
- Color direction: “Miami F1” blue/pink glow accents (subtle).
- Use shadcn/ui variants for consistent buttons, cards, inputs.
- Layout: desktop-optimized spacing + clear section separation.


## 4) ReactBits integration (v1: scaffold + 1–2 used)
Do NOT over-integrate early. In v1:
- Integrate **one** tasteful ReactBits effect in the Hero background (lazy-load if needed).
- Scaffold a `src/components/reactbits/` folder and wrappers so more can be added later.


## 5) Data model (Supabase)
Create SQL migrations (in `supabase/migrations/`) for:


### Table: leads
Fields:
- id uuid pk default gen_random_uuid()
- created_at timestamptz default now()
- source text default 'lead_intake'
- business_name text not null
- website_url text null
- industry text null
- employees_range text not null
- ad_spend_range text not null
- primary_goal text null
- services_interested text[] not null default '{}'
- contact_name text not null
- email text not null
- phone text null
- preferred_contact text null
- notes text null
- status text not null default 'new'


### Table: insights_subscribers
Fields:
- id uuid pk default gen_random_uuid()
- created_at timestamptz default now()
- email text unique not null
- source text default 'website'
- status text not null default 'active'


RLS:
- Enable RLS.
- No public selects.
- Inserts only through server (service role). Keep policies minimal.


## 6) API contracts


### POST /api/leads
- Validate input via Zod schema (server).
- Insert into `leads`.
- Return: `{ ok: true }` or `{ ok: false, error: string }`.


### POST /api/insights
- Validate email via Zod.
- Upsert into `insights_subscribers`.
- Return: `{ ok: true }` or `{ ok: false, error: string }`.


Anti-spam:
- Honeypot field on both forms (e.g. `company_fax`).
- Basic rate limiting (simple IP-based in-memory is acceptable for v1).


## 7) Repo structure (required)
Use this structure:
src/ app/ (marketing)/ layout.tsx page.tsx api/ leads/route.ts insights/route.ts health/route.ts components/ marketing/ Landing.tsx sections/ LeadIntakeForm.tsx InsightsSignup.tsx reactbits/ ui/ content/ site.ts services.ts portfolio.ts testimonials.ts lib/ env.ts supabase.ts validators.ts analytics.ts

## 8) Environment variables
Create `.env.example` with:
- NEXT_PUBLIC_SITE_URL=
- SUPABASE_URL=
- SUPABASE_SERVICE_ROLE_KEY=


Never expose service role key to client code.


Use `src/lib/env.ts` with Zod to validate env at runtime for server routes.


## 9) Implementation steps (do in order)
1) Initialize Next.js app (App Router, TS, Tailwind, ESLint).
2) Install shadcn/ui and add required UI components.
3) Create the marketing page structure and sections (static first).
4) Add content files in `src/content/*` and render sections from content.
5) Build Lead Intake form component:
- 2-step UX preferred
- Zod validation + good errors + success state
6) Build Insights signup component (email only).
7) Implement API routes + Supabase server client + inserts.
8) Add honeypot + rate limiting.
9) Add one ReactBits hero effect (scaffold wrappers).
10) QA: run typecheck, lint, build.
11) Write README with setup instructions.


## 10) Definition of Done (DoD)
- `pnpm install && pnpm dev` runs successfully.
- Landing page matches required section order and looks premium.
- Lead intake form submits and writes to Supabase.
- Insights signup submits and writes to Supabase.
- API routes validate input and handle errors.
- No secrets shipped to browser.
- Basic spam protections in place.
- README + .env.example included.


## 11) Commands
Preferred package manager: **pnpm**.
Scripts:
- dev, build, lint, typecheck


## 12) Notes to Codex
- Keep code clean and modular.
- Avoid premature complexity.
- Prefer route handlers for clear API boundaries.
- No external CMS in v1; just scaffold content modules.