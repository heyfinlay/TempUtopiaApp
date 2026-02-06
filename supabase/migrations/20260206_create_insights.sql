create extension if not exists "pgcrypto";

create table if not exists public.insights_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text unique not null,
  source text not null default 'website',
  status text not null default 'active'
);

alter table public.insights_subscribers enable row level security;

drop policy if exists "service role inserts insights" on public.insights_subscribers;
create policy "service role inserts insights" on public.insights_subscribers
  for insert with check (auth.role() = 'service_role');

drop policy if exists "service role updates insights" on public.insights_subscribers;
create policy "service role updates insights" on public.insights_subscribers
  for update using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
