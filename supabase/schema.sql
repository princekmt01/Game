-- Math Sprint: scores table schema
-- Run this in the Supabase SQL Editor after creating your project.

create table if not exists public.scores (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  score integer not null check (score >= 0),
  correct_answers integer not null check (correct_answers >= 0),
  wrong_answers integer not null check (wrong_answers >= 0),
  accuracy numeric(5, 2) not null check (accuracy >= 0 and accuracy <= 100),
  created_at timestamptz not null default now()
);

create index if not exists scores_score_created_at_idx
  on public.scores (score desc, created_at desc);

alter table public.scores enable row level security;

create policy "Anyone can read scores"
  on public.scores
  for select
  using (true);

create policy "Anyone can insert scores"
  on public.scores
  for insert
  with check (true);

-- Enable Realtime for the leaderboard
alter publication supabase_realtime add table public.scores;
