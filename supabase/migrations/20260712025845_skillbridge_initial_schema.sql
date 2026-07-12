-- SkillBridge Local MVP schema
-- Public tables use RLS and explicit Data API grants for Supabase's 2026 defaults.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

do $$ begin
  create type public.user_role as enum ('business', 'student', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.task_status as enum ('open', 'reviewing', 'assigned', 'in_progress', 'review', 'completed');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type public.application_status as enum ('pending', 'shortlisted', 'accepted', 'declined');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'student',
  display_name text not null check (char_length(display_name) between 2 and 100),
  organization_name text,
  course text,
  location text not null default 'Chennai',
  bio text,
  skills text[] not null default '{}',
  availability text,
  portfolio_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references public.profiles(id) on delete set null,
  business_name_snapshot text not null,
  title text not null check (char_length(title) between 4 and 120),
  category text not null,
  description text not null check (char_length(description) between 12 and 2000),
  desired_outcome text,
  scope_summary text not null,
  deliverables text[] not null default '{}',
  acceptance_criteria text[] not null default '{}',
  skills text[] not null default '{}',
  budget_amount numeric(10, 2) not null default 0 check (budget_amount >= 0),
  estimated_hours integer not null default 1 check (estimated_hours between 1 and 200),
  duration_label text not null,
  location text not null default 'Chennai',
  status public.task_status not null default 'open',
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  assigned_student_id uuid references public.profiles(id) on delete set null,
  progress smallint not null default 0 check (progress between 0 and 100),
  mock_payment_status text not null default 'not_started' check (mock_payment_status in ('not_started', 'held', 'ready', 'released')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  pitch text not null check (char_length(pitch) between 20 and 1200),
  availability text not null,
  status public.application_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (task_id, student_id)
);

create table if not exists public.task_updates (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  actor_id uuid not null references public.profiles(id) on delete cascade,
  from_status public.task_status,
  to_status public.task_status not null,
  note text check (char_length(note) <= 1000),
  created_at timestamptz not null default now()
);

create index if not exists tasks_status_created_idx on public.tasks(status, created_at desc);
create index if not exists tasks_business_idx on public.tasks(business_id, created_at desc);
create index if not exists tasks_assigned_student_idx on public.tasks(assigned_student_id, status);
create index if not exists applications_task_status_idx on public.applications(task_id, status);
create index if not exists applications_student_idx on public.applications(student_id, created_at desc);
create index if not exists task_updates_task_idx on public.task_updates(task_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at before update on public.tasks
for each row execute function public.set_updated_at();

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at before update on public.applications
for each row execute function public.set_updated_at();

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  requested_role public.user_role;
begin
  requested_role := case
    when new.raw_user_meta_data ->> 'role' = 'business' then 'business'::public.user_role
    else 'student'::public.user_role
  end;

  insert into public.profiles (id, role, display_name, organization_name, course, location)
  values (
    new.id,
    requested_role,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), split_part(coalesce(new.email, 'New member'), '@', 1)),
    nullif(new.raw_user_meta_data ->> 'organization_name', ''),
    nullif(new.raw_user_meta_data ->> 'course', ''),
    coalesce(nullif(new.raw_user_meta_data ->> 'location', ''), 'Chennai')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

revoke all on function private.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function private.handle_new_user();

create or replace function private.prevent_profile_role_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.role is distinct from old.role
     and coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') <> 'admin' then
    raise exception 'profile role changes require an administrator';
  end if;
  return new;
end;
$$;

revoke all on function private.prevent_profile_role_change() from public, anon, authenticated;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role before update on public.profiles
for each row execute function private.prevent_profile_role_change();

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.applications enable row level security;
alter table public.task_updates enable row level security;

revoke all on table public.profiles, public.tasks, public.applications, public.task_updates from anon, authenticated;

grant usage on schema public to anon, authenticated;
grant usage on type public.user_role, public.task_status, public.application_status to authenticated;
grant usage on type public.task_status to anon;
grant select on public.tasks to anon;
grant select on public.tasks to authenticated;
grant select on public.profiles to authenticated;
grant update (display_name, organization_name, course, location, bio, skills, availability, portfolio_url) on public.profiles to authenticated;
grant insert, update, delete on public.tasks to authenticated;
grant select, insert, update, delete on public.applications to authenticated;
grant select, insert on public.task_updates to authenticated;

drop policy if exists "public can read visible tasks" on public.tasks;
create policy "public can read visible tasks"
on public.tasks for select
to anon, authenticated
using (
  visibility = 'public'
  or business_id = (select auth.uid())
  or assigned_student_id = (select auth.uid())
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "members can read own profile" on public.profiles;
create policy "members can read own profile"
on public.profiles for select
to authenticated
using (
  id = (select auth.uid())
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "members can update own profile" on public.profiles;
create policy "members can update own profile"
on public.profiles for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists "businesses can create tasks" on public.tasks;
create policy "businesses can create tasks"
on public.tasks for insert
to authenticated
with check (
  business_id = (select auth.uid())
  and exists (
    select 1 from public.profiles
    where profiles.id = (select auth.uid()) and profiles.role = 'business'
  )
);

drop policy if exists "owners and admins can update tasks" on public.tasks;
create policy "owners and admins can update tasks"
on public.tasks for update
to authenticated
using (
  business_id = (select auth.uid())
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
)
with check (
  business_id = (select auth.uid())
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "owners and admins can delete tasks" on public.tasks;
create policy "owners and admins can delete tasks"
on public.tasks for delete
to authenticated
using (
  (business_id = (select auth.uid()) and status in ('open', 'reviewing'))
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "participants can read applications" on public.applications;
create policy "participants can read applications"
on public.applications for select
to authenticated
using (
  student_id = (select auth.uid())
  or exists (
    select 1 from public.tasks
    where tasks.id = applications.task_id and tasks.business_id = (select auth.uid())
  )
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "students can apply" on public.applications;
create policy "students can apply"
on public.applications for insert
to authenticated
with check (
  student_id = (select auth.uid())
  and exists (
    select 1 from public.profiles
    where profiles.id = (select auth.uid()) and profiles.role = 'student'
  )
  and exists (
    select 1 from public.tasks
    where tasks.id = applications.task_id and tasks.status in ('open', 'reviewing')
  )
);

drop policy if exists "admins can update applications" on public.applications;
create policy "admins can update applications"
on public.applications for update
to authenticated
using (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin')
with check (coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin');

drop policy if exists "students can withdraw pending applications" on public.applications;
create policy "students can withdraw pending applications"
on public.applications for delete
to authenticated
using (student_id = (select auth.uid()) and status = 'pending');

drop policy if exists "task participants can read updates" on public.task_updates;
create policy "task participants can read updates"
on public.task_updates for select
to authenticated
using (
  exists (
    select 1 from public.tasks
    where tasks.id = task_updates.task_id
      and (tasks.business_id = (select auth.uid()) or tasks.assigned_student_id = (select auth.uid()))
  )
  or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "task participants can add updates" on public.task_updates;
create policy "task participants can add updates"
on public.task_updates for insert
to authenticated
with check (
  actor_id = (select auth.uid())
  and (
    exists (
      select 1 from public.tasks
      where tasks.id = task_updates.task_id
        and (tasks.business_id = (select auth.uid()) or tasks.assigned_student_id = (select auth.uid()))
    )
    or coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
  )
);
