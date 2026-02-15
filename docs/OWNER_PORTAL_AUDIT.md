# Owner Portal Audit (Phase A: Inventory)

## Route Tree (src/app)
```
/api/agent
/api/agent/log
/api/companies
/api/companies/[id]
/api/companies/portal
/api/me
/api/owner
/api/owner/summary
/api/proposal
/api/proposal/generate
/api/proposal/save
/api/scrape
/api/tasks
/api/tasks/[id]
/auth
/auth/callback
/auth/login
/companies
/companies/[id]
/companies/[id]/proposal
/companies/new
/leads
/leads/[id]
/leads/new
/login
/logout
/overview
/owner
/owner/conversations
/owner/integrations
/owner/meetings
/owner/tasks
/portal
/portal/[companyId]
/settings
/tasks
/tasks/[id]
```

Owner portal routes of interest:
- `/owner` (client portal main)
- `/owner/*` (legacy scaffolds, currently unused by prototype UI)
- `/api/owner/summary`
- `/api/owner/settings`
- `/api/agent/log`

## Navigation Map (Owner UI)
**File:** `src/app/owner/page.tsx`
- Sidebar nav buttons (client‑safe):
  - Overview
  - Work Log (Tasks)
  - Leads
  - Outreach
  - Schedule
  - Agent Settings
  - Support
- Topbar:
  - Search bar (input)
  - Agent status pill (Agent Running/Paused)
  - Notifications pill
  - Account avatar (FS)
- Primary actions in hero:
  - Request a lead push now
  - Add a target profile
  - Pause outreach
- Key links/buttons:
  - “View all” button in Work Log panel (non‑functional placeholder)
  - “Export CSV” + “View all leads” buttons in Leads panel (non‑functional placeholders)
  - “Edit schedule” button
  - “Save settings” button (wired to `/api/owner/settings`)

## Data Map (Mock vs Real)
**Mock data sources:**
- `MOCK_TASKS`, `MOCK_LEADS` in `src/app/owner/page.tsx`
- Used as fallback if `/api/owner/summary` returns empty/no data

**Real data sources:**
- `/api/owner/summary` (file: `src/app/api/owner/summary/route.ts`)
  - `metrics` (leads/replies/queued/booked counts)
  - `tasks` (agent_tasks)
  - `leads` (leads)
  - `settings` (agent_settings)
  - `agent` (agents)
- `/api/owner/settings` (file: `src/app/api/owner/settings/route.ts`)
  - Updates safe settings in `agent_settings`
- `/api/agent/log` (file: `src/app/api/agent/log/route.ts`)
  - Agent writes runs/tasks/leads to Supabase (service role)

## Auth / Session Map
**Primary auth layer:**
- `src/lib/supabase/middleware.ts`
  - Protected prefixes include `/owner`, `/companies`, `/leads`, `/tasks`, `/settings`, `/portal`, `/app`
  - Redirects unauthenticated users to `/login`
  - Redirects authenticated users from `/` and `/login` to `/owner`

**Session provider:**
- Supabase SSR client in `src/lib/supabase/server.ts`
- Middleware uses `createServerClient<Database>` with anon key

**Is `/owner` protected?**
- Yes, `/owner` is in `PROTECTED_PREFIXES` and requires auth via middleware.

## README Confirmation
**File:** `README.md` (Owner Portal section)
- `/owner` is the dashboard
- Agent logs → `POST /api/agent/log`
- `/api/owner/summary` powers `/owner`
- `/api/owner/settings` updates safe settings
- Tables: clients, agents, agent_runs, agent_tasks, leads, conversations, meetings, agent_settings

## Playwright Findings (Phase B)
**Status:** Playwright setup added (config + tests). Not executed in this environment due to pnpm availability; run locally with:
```
pnpm exec playwright test
```
**Tests created:** `tests/owner-portal.spec.ts`
- Auth: /owner redirects to /login when logged out
- Auth (optional): logged‑in identity visible when credentials provided via env
- Nav: “View all leads” navigates to leads page (expected to fail until wired)
- Nav: “Work log” shows DB‑backed entries or empty state (expected to fail if no data)
- Search: filters work log results
- Search: lead match navigates to lead detail (expected to fail until wired)

## Notes / Gaps
- `/owner/*` route pages exist but are not used by the prototype UI (the prototype stays within `/owner` only).
- “View all leads”, “Work log”, etc. are placeholder actions and not yet routed.
- Search bar is UI‑only; filters mock/loaded data client‑side.
