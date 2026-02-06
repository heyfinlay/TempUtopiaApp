create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'lead_intake',
  business_name text not null,
  website_url text,
  industry text,
  employees_range text not null,
  ad_spend_range text not null,
  primary_goal text,
  services_interested text[] not null default '{}',
  contact_name text not null,
  email text not null,
  phone text,
  preferred_contact text,
  notes text,
  status text not null default 'new'
);

alter table public.leads enable row level security;

drop policy if exists "service role inserts leads" on public.leads;
create policy "service role inserts leads" on public.leads
  for insert with check (auth.role() = 'service_role');
