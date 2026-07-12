-- Performance improvements recommended by the Supabase database advisor.

create index if not exists task_updates_actor_idx on public.task_updates(actor_id);

drop policy if exists "public can read visible tasks" on public.tasks;
create policy "public can read visible tasks"
on public.tasks for select
to anon, authenticated
using (
  visibility = 'public'
  or business_id = (select auth.uid())
  or assigned_student_id = (select auth.uid())
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "members can read own profile" on public.profiles;
create policy "members can read own profile"
on public.profiles for select
to authenticated
using (
  id = (select auth.uid())
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "owners and admins can update tasks" on public.tasks;
create policy "owners and admins can update tasks"
on public.tasks for update
to authenticated
using (
  business_id = (select auth.uid())
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
)
with check (
  business_id = (select auth.uid())
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "owners and admins can delete tasks" on public.tasks;
create policy "owners and admins can delete tasks"
on public.tasks for delete
to authenticated
using (
  (business_id = (select auth.uid()) and status in ('open', 'reviewing'))
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
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
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
);

drop policy if exists "admins can update applications" on public.applications;
create policy "admins can update applications"
on public.applications for update
to authenticated
using (coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin')
with check (coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin');

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
  or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
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
    or coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'admin'
  )
);
