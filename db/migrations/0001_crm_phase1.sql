-- db/migrations/0001_crm_phase1.sql
create type contact_status as enum
  ('new','contacted','proposal','won','onboarding','active','lost');

create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  company text,
  source text not null check (source in ('contact_form','quick_audit','manual')),
  message text,
  status contact_status not null default 'new',
  notes text,
  last_activity_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table activities (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacts(id) on delete cascade,
  type text not null check (type in ('enquiry_in','reply_logged','note','status_change')),
  body text,
  created_at timestamptz not null default now()
);

create index contacts_status_last_activity_idx on contacts (status, last_activity_at);
create index activities_contact_id_created_idx on activities (contact_id, created_at desc)
