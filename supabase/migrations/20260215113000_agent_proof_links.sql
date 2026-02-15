-- add proof links for runs/tasks
alter table public.agent_runs add column if not exists proof_url text;
alter table public.agent_tasks add column if not exists proof_url text;
