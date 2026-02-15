-- Owner portal core tables + RLS

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  timezone text default 'Australia/Sydney',
  owner_user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists clients_owner_user_id_idx on public.clients(owner_user_id);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  name text not null default 'Primary Agent',
  status text not null default 'running',
  last_run_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists agents_client_id_idx on public.agents(client_id);

create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  type text not null,
  status text not null default 'complete',
  started_at timestamptz default now(),
  completed_at timestamptz,
  summary text,
  output_count integer default 0,
  meta jsonb default '{}'::jsonb
);

create index if not exists agent_runs_client_id_idx on public.agent_runs(client_id);
create index if not exists agent_runs_agent_id_idx on public.agent_runs(agent_id);

create table if not exists public.agent_tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete set null,
  run_id uuid references public.agent_runs(id) on delete set null,
  title text not null,
  source text,
  output text,
  status text not null default 'complete',
  created_at timestamptz not null default now()
);

create index if not exists agent_tasks_client_id_idx on public.agent_tasks(client_id);
create index if not exists agent_tasks_run_id_idx on public.agent_tasks(run_id);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  channel text,
  direction text,
  contact_name text,
  contact_handle text,
  last_message text,
  status text,
  created_at timestamptz not null default now()
);

create index if not exists conversations_client_id_idx on public.conversations(client_id);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  contact_name text,
  scheduled_for timestamptz,
  status text,
  source text,
  created_at timestamptz not null default now()
);

create index if not exists meetings_client_id_idx on public.meetings(client_id);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  company text not null,
  channel text,
  fit_score integer,
  reason text,
  origin_task_id uuid references public.agent_tasks(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists leads_client_id_idx on public.leads(client_id);

create table if not exists public.agent_settings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  industry text,
  location text,
  max_outreach_per_day integer default 15,
  approval_required boolean default true,
  exclude_keywords text,
  offer_focus text,
  updated_at timestamptz not null default now()
);

create unique index if not exists agent_settings_client_id_key on public.agent_settings(client_id);

-- RLS
alter table public.clients enable row level security;
alter table public.agents enable row level security;
alter table public.agent_runs enable row level security;
alter table public.agent_tasks enable row level security;
alter table public.conversations enable row level security;
alter table public.meetings enable row level security;
alter table public.leads enable row level security;
alter table public.agent_settings enable row level security;

-- Helper: owner can see their client rows
create policy if not exists "clients_owner_select" on public.clients
  for select using (owner_user_id = auth.uid());

create policy if not exists "clients_owner_insert" on public.clients
  for insert with check (owner_user_id = auth.uid());

create policy if not exists "clients_owner_update" on public.clients
  for update using (owner_user_id = auth.uid()) with check (owner_user_id = auth.uid());

-- Read access for owners across portal tables
create policy if not exists "agents_owner_select" on public.agents
  for select using (client_id in (select id from public.clients where owner_user_id = auth.uid()));

create policy if not exists "agent_runs_owner_select" on public.agent_runs
  for select using (client_id in (select id from public.clients where owner_user_id = auth.uid()));

create policy if not exists "agent_tasks_owner_select" on public.agent_tasks
  for select using (client_id in (select id from public.clients where owner_user_id = auth.uid()));

create policy if not exists "conversations_owner_select" on public.conversations
  for select using (client_id in (select id from public.clients where owner_user_id = auth.uid()));

create policy if not exists "meetings_owner_select" on public.meetings
  for select using (client_id in (select id from public.clients where owner_user_id = auth.uid()));

create policy if not exists "leads_owner_select" on public.leads
  for select using (client_id in (select id from public.clients where owner_user_id = auth.uid()));

create policy if not exists "agent_settings_owner_select" on public.agent_settings
  for select using (client_id in (select id from public.clients where owner_user_id = auth.uid()));

-- Owners can update ONLY agent_settings
create policy if not exists "agent_settings_owner_update" on public.agent_settings
  for update using (client_id in (select id from public.clients where owner_user_id = auth.uid()))
  with check (client_id in (select id from public.clients where owner_user_id = auth.uid()));

create policy if not exists "agent_settings_owner_insert" on public.agent_settings
  for insert with check (client_id in (select id from public.clients where owner_user_id = auth.uid()));

-- Service role can write everywhere
create policy if not exists "service_role_write_clients" on public.clients
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists "service_role_write_agents" on public.agents
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists "service_role_write_agent_runs" on public.agent_runs
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists "service_role_write_agent_tasks" on public.agent_tasks
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists "service_role_write_conversations" on public.conversations
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists "service_role_write_meetings" on public.meetings
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists "service_role_write_leads" on public.leads
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy if not exists "service_role_write_agent_settings" on public.agent_settings
  for all to authenticated using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
