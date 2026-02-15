# Owner Portal (Client Dashboard)

## Purpose
The Owner Portal gives business clients a **proof‑of‑work** dashboard to review agent actions, outcomes, and metrics without exposing internal automation complexity.

## High‑level flow
1. **Agent logs** its work to Supabase via `POST /api/agent/log`.
2. **Supabase tables** store runs/tasks/leads/conversations/meetings.
3. **Dashboard** reads `/api/owner/summary` and renders metrics + proof links.
4. **Clients** can only update `agent_settings` (safe configuration).

## API
### POST /api/agent/log
Write runs, tasks, and leads from the agent runtime.

**Headers**
- `x-agent-secret: <AGENT_LOG_SECRET>` (optional, recommended)

**Payload**
```json
{
  "client_id": "...",
  "agent_id": "...",
  "run": {
    "type": "lead_sweep",
    "status": "complete",
    "summary": "Found 14 cosmetic clinics in Melbourne",
    "output_count": 14,
    "proof_url": "https://.../UtopiaBucket/leads.csv"
  },
  "tasks": [
    {
      "title": "Find 10 clinics in Melbourne",
      "source": "Google Maps",
      "output": "14 leads",
      "status": "complete",
      "proof_url": "https://.../UtopiaBucket/leads.csv"
    }
  ],
  "leads": [
    {
      "company": "Vogue Aesthetics",
      "channel": "Instagram",
      "fit_score": 91,
      "reason": "Runs ads"
    }
  ]
}
```

### GET /api/owner/summary
Returns metrics, tasks, leads, settings, agent status for the logged‑in owner.

### POST /api/owner/settings
Updates safe settings in `agent_settings`.

## Supabase Tables
- `clients`
- `agents`
- `agent_runs`
- `agent_tasks`
- `leads`
- `conversations`
- `meetings`
- `agent_settings`

## Storage (Proof Links)
CSV or assets should be uploaded to **Supabase Storage** (bucket: `UtopiaBucket`). Store the public URL in `proof_url`.

## RLS Policy (Summary)
- Owners can **read** all portal data for their client.
- Owners can **write** only to `agent_settings`.
- Service role can **write** everything (agent logging).

## Dashboard Routes
- `/owner` — main dashboard
- `/api/owner/*` — data providers

## TODO (Next)
- CSV upload helper to Supabase Storage
- Auto‑logging from Discord channel triggers
- CRM export integration
