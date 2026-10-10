-- Frontier Tech Week attendee registrations.
-- Run in the Supabase SQL editor (or `supabase db push`).

create table if not exists public.registrations (
  id                          uuid primary key default gen_random_uuid(),
  reference                   text not null unique,
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now(),

  status                      text not null default 'pending'
                              check (status in ('pending', 'paid', 'failed')),

  -- Pass
  pass_type                   text not null check (pass_type in ('day', 'summit', 'season')),
  pass_days                   date[] not null default '{}',
  amount_paise                integer not null check (amount_paise > 0),
  currency                    text not null default 'INR',

  -- Attendee
  full_name                   text not null,
  email                       text not null,
  phone                       text not null,
  city                        text not null,
  organization                text not null,
  designation                 text not null,
  attendee_type               text not null,
  linkedin_url                text,
  interests                   text[] not null default '{}',
  heard_from                  text,
  gstin                       text,
  consent_terms               boolean not null,
  consent_updates             boolean not null default false,
  user_agent                  text,

  -- Payment
  razorpay_order_id           text unique,
  razorpay_payment_id         text,
  paid_at                     timestamptz,
  confirmation_email_sent_at  timestamptz
);

create index if not exists registrations_email_idx on public.registrations (lower(email));
create index if not exists registrations_status_idx on public.registrations (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists registrations_set_updated_at on public.registrations;
create trigger registrations_set_updated_at
  before update on public.registrations
  for each row execute function public.set_updated_at();

-- Only the server (service role) touches this table. RLS on + no policies
-- means the public anon key can neither read nor write attendee data.
alter table public.registrations enable row level security;

-- Handy view for the team: confirmed attendees only.
create or replace view public.paid_registrations
with (security_invoker = true) as
  select reference, created_at, paid_at, pass_type, pass_days,
         amount_paise / 100 as amount_inr, full_name, email, phone, city,
         organization, designation, attendee_type, linkedin_url, interests,
         heard_from, gstin, consent_updates, razorpay_payment_id
  from public.registrations
  where status = 'paid'
  order by paid_at desc;
