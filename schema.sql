-- ==========================================
-- Supabase Schema Migration Script
-- Copy and paste this script directly into your Supabase SQL Editor.
-- ==========================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop all existing tables to perform a clean start
drop table if exists public.admin_profiles cascade;
drop table if exists public.site_settings cascade;
drop table if exists public.homepage_copy cascade;
drop table if exists public.services cascade;
drop table if exists public.projects cascade;
drop table if exists public.articles cascade;
drop table if exists public.about_page_settings cascade;
drop table if exists public.services_page_settings cascade;
drop table if exists public.portfolio_page_settings cascade;
drop table if exists public.contact_page_settings cascade;
drop table if exists public.consultation_page_settings cascade;
drop table if exists public.tasks cascade;
drop table if exists public.daily_reports cascade;
drop table if exists public.activity_logs cascade;
drop table if exists public.active_sessions cascade;
drop table if exists public.milestone_submissions cascade;
drop table if exists public.milestone_doubts cascade;
drop table if exists public.milestones cascade;
drop table if exists public.domains cascade;
drop table if exists public.notifications cascade;
drop table if exists public.contact_inquiries cascade;
drop table if exists public.consultation_bookings cascade;

-- 1. Create Admin Profiles table for Role-Based Access Control
create table admin_profiles (
  id uuid primary key,
  email text not null unique,
  role text not null check (role in ('super_admin', 'admin')),
  permissions text[] not null default '{}',
  name text,
  avatar_url text,
  title text,
  linkedin_url text,
  github_url text,
  bio text,
  resume_url text,
  has_password boolean default false,
  show_on_website boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.admin_profiles add column if not exists github_url text;

-- 2. Create Site Settings table
create table site_settings (
  id integer primary key default 1 check (id = 1),
  brand_name text not null default 'Orbitecks',
  logo_first text not null default 'Orbi',
  logo_second text not null default 'tecks',
  contact_email text not null,
  contact_phone text not null,
  contact_location text not null,
  contact_hours text not null,
  social_instagram text,
  social_linkedin text,
  social_github text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Homepage Copy table
create table homepage_copy (
  id integer primary key default 1 check (id = 1),
  hero_tag text not null default 'Creative Digital Agency',
  hero_title_main text not null default 'Awesome',
  hero_title_sub text not null default 'Solution For',
  hero_title_accent text not null default 'Your Business',
  hero_description text not null,
  cta_badge text not null default 'Work With Us',
  cta_title text not null,
  cta_description text not null,
  brands jsonb not null default '[]'::jsonb,
  about_snippet jsonb not null default '{}'::jsonb,
  process_section jsonb not null default '{}'::jsonb,
  testimonials_section jsonb not null default '{}'::jsonb,
  cta_banner jsonb not null default '{}'::jsonb,
  hero_stats jsonb not null default '[]'::jsonb,
  hero_analytics_card jsonb not null default '{}'::jsonb,
  hero_float_cards jsonb not null default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create Services list table
create table services (
  id text primary key, -- e.g., 'brand-identity', 'web-design-dev'
  title text not null,
  desc_short text not null,
  icon_name text not null, -- e.g., '✦', '⬡', '◎', etc.
  detail_title text not null default '',
  detail_desc text not null default '',
  features text[] not null default '{}',
  process_steps jsonb not null default '[]'::jsonb,
  faq_items jsonb not null default '[]'::jsonb,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create Projects table
create table projects (
  id text primary key, -- e.g., 'pap-studio-rebrand'
  title text not null,
  client text not null,
  year text not null,
  cat text not null,
  description text not null,
  img_url text not null,
  detail_overview text not null,
  detail_challenge text not null,
  detail_solution text not null,
  detail_outcome text not null,
  duration text not null default '',
  services text[] not null default '{}',
  results text[] not null default '{}',
  gallery_images text[] not null default '{}',
  stats jsonb not null default '[]'::jsonb,
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Create Blog Articles table
create table articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  cat text not null,
  publish_date text not null,
  excerpt text not null,
  img_url text not null,
  author_name text not null,
  author_linkedin text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. About Page Copy table
create table about_page_settings (
  id integer primary key default 1 check (id = 1),
  hero_tag text not null default 'About Us',
  hero_title_main text not null default 'We Are A',
  hero_title_accent text not null default 'Creative',
  hero_title_end text not null default 'Digital Agency',
  hero_description text not null,
  stats jsonb not null default '[]'::jsonb, -- Array of {val, unit, desc}
  mission_label text not null default 'Our Mission',
  mission_title text not null,
  mission_description1 text not null,
  mission_description2 text not null,
  mission_image_url text not null,
  mission_image_label text not null,
  mission_image_subtext text not null,
  team_label text not null default 'Our Team',
  team_title text not null,
  values_label text not null default 'What We Stand For',
  values_title text not null,
  values_list jsonb not null default '[]'::jsonb, -- Array of {icon, title, desc}
  cta_label text not null default 'Work With Us',
  cta_title text not null,
  cta_description text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Services Page Copy table
create table services_page_settings (
  id integer primary key default 1 check (id = 1),
  hero_tag text not null default 'What We Offer',
  hero_title_main text not null default 'Services That Drive',
  hero_title_accent text not null default 'Real Results',
  hero_description text not null,
  expertise_label text not null default 'Our Expertise',
  expertise_title text not null,
  process_label text not null default 'How We Work',
  process_title text not null,
  process_description text not null,
  process_image_url text not null,
  process_roi_label text not null default 'Average Project ROI',
  process_roi_value text not null default '342%',
  pricing_label text not null default 'Transparent Pricing',
  pricing_title text not null,
  pricing_packages jsonb not null default '[]'::jsonb, -- Array of {name, price, period, desc, features: [], highlight: boolean}
  cta_title text not null,
  cta_description text not null,
  cta_btn_text text not null default 'Book Free Consultation →',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Portfolio Page Copy table
create table portfolio_page_settings (
  id integer primary key default 1 check (id = 1),
  hero_tag text not null default 'Our Work',
  hero_title_main text not null default 'Projects That',
  hero_title_accent text not null default 'Define Us',
  hero_description text not null,
  stats jsonb not null default '[]'::jsonb, -- Array of {val, label}
  categories jsonb not null default '[]'::jsonb, -- Array of string
  cta_title text not null,
  cta_description text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. Contact Page Copy table
create table contact_page_settings (
  id integer primary key default 1 check (id = 1),
  hero_tag text not null default 'Contact Us',
  hero_title_main text not null default 'Get In Touch',
  hero_title_accent text not null default 'With Us',
  hero_description text not null,
  info_label text not null default 'Contact Info',
  info_title text not null,
  info_description text not null,
  faq_items jsonb not null default '[]'::jsonb,
  trust_strip jsonb not null default '[]'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Consultation Page Copy table
create table consultation_page_settings (
  id integer primary key default 1 check (id = 1),
  hero_badge text not null default '✦ Free, No-Commitment Consultation',
  hero_title text not null,
  hero_description text not null,
  steps jsonb not null default '[]'::jsonb, -- Array of {label, icon}
  success_title text not null,
  success_desc text not null,
  success_btn_home text not null,
  success_btn_work text not null,
  slots jsonb not null default '[]'::jsonb, -- Array of string
  expect_title text not null,
  expect_subtitle text not null,
  expect_list jsonb not null default '[]'::jsonb, -- Array of {icon, title, desc}
  trust_badges jsonb not null default '[]'::jsonb, -- Array of string
  budgets jsonb not null default '["Under ₹15,000", "₹15,000 – ₹30,000", "₹30,000 – ₹60,000", "₹60,000 – ₹1,00,000", "₹1,00,000+"]'::jsonb, -- Array of string
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. Create Tasks table
create table tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  status text not null check (status in ('pending', 'in_progress', 'completed')) default 'pending',
  assigned_to uuid not null references public.admin_profiles(id) on delete cascade on update cascade,
  assigned_by uuid references public.admin_profiles(id) on delete set null on update cascade,
  due_date text,
  document_url text,
  completion_notes text,
  feedback text,
  reviewed_at timestamp with time zone,
  reviewed_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. Create Daily Reports table
create table daily_reports (
  id uuid default gen_random_uuid() primary key,
  member_id uuid not null references public.admin_profiles(id) on delete cascade on update cascade,
  report_date text not null, -- format 'YYYY-MM-DD'
  tasks_completed text not null,
  challenges_faced text,
  hours_spent numeric(4,2) default 8.00,
  status text default 'submitted',
  feedback text,
  reviewed_at timestamp with time zone,
  reviewed_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (member_id, report_date)
);

-- 14. Create Activity Logs table
create table activity_logs (
  id uuid default gen_random_uuid() primary key,
  admin_id uuid references public.admin_profiles(id) on delete set null on update cascade,
  admin_email text not null,
  action text not null,
  details text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 15. Create Active Sessions table
create table active_sessions (
  id uuid default gen_random_uuid() primary key,
  admin_id uuid not null references public.admin_profiles(id) on delete cascade on update cascade,
  device_id text not null,
  device_name text not null,
  last_active timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (admin_id, device_id)
);

-- 16. Create Notifications table
create table notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references public.admin_profiles(id) on delete cascade on update cascade,
  title text not null,
  message text not null,
  type text not null default 'general', -- 'task', 'milestone', 'doubt', 'report', 'general'
  link text,
  read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 17. Create Domains table
create table if not exists public.domains (
  id text primary key,
  name text not null,
  description text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 18. Create Milestones table
create table if not exists public.milestones (
  id uuid default gen_random_uuid() primary key,
  domain_id text not null references public.domains(id) on delete cascade on update cascade,
  title text not null,
  description text,
  task_summary text,
  deliverables text,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (domain_id, title)
);

alter table public.milestones add column if not exists description text;
alter table public.milestones add column if not exists task_summary text;
alter table public.milestones add column if not exists deliverables text;

-- 19. Create Milestone Submissions table
create table if not exists public.milestone_submissions (
  id uuid default gen_random_uuid() primary key,
  milestone_id uuid not null references public.milestones(id) on delete cascade on update cascade,
  admin_id uuid not null references public.admin_profiles(id) on delete cascade on update cascade,
  report_text text,
  document_url text,
  status text not null check (status in ('in_progress', 'pending', 'approved', 'rejected')) default 'in_progress',
  feedback text,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  reviewed_at timestamp with time zone,
  reviewed_by uuid references public.admin_profiles(id) on delete set null,
  unique (admin_id, milestone_id)
);

-- 20. Create Milestone Doubts table
create table if not exists public.milestone_doubts (
  id uuid default gen_random_uuid() primary key,
  milestone_id uuid references public.milestones(id) on delete cascade on update cascade,
  admin_id uuid not null references public.admin_profiles(id) on delete cascade on update cascade,
  query_text text not null,
  resolved boolean default false,
  answer text,
  resolved_at timestamp with time zone,
  resolved_by uuid references public.admin_profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Migrations for milestone_doubts columns
alter table public.milestone_doubts alter column milestone_id drop not null;
alter table public.milestone_doubts add column if not exists resolved_at timestamp with time zone;
alter table public.milestone_doubts add column if not exists resolved_by uuid references public.admin_profiles(id) on delete set null;

-- Rename legacy 'question' column to 'query_text' if it exists in an older database instance
do $$ 
begin 
  if exists (
    select 1 from information_schema.columns 
    where table_name='milestone_doubts' and column_name='question'
  ) and not exists (
    select 1 from information_schema.columns 
    where table_name='milestone_doubts' and column_name='query_text'
  ) then 
    alter table public.milestone_doubts rename column question to query_text;
  end if;
end $$;

-- ==========================================
-- Enable Row Level Security (RLS)
-- ==========================================
alter table admin_profiles enable row level security;
alter table site_settings enable row level security;
alter table homepage_copy enable row level security;
alter table services enable row level security;
alter table projects enable row level security;
alter table articles enable row level security;
alter table about_page_settings enable row level security;
alter table services_page_settings enable row level security;
alter table portfolio_page_settings enable row level security;
alter table contact_page_settings enable row level security;
alter table consultation_page_settings enable row level security;
alter table tasks enable row level security;
alter table daily_reports enable row level security;
alter table activity_logs enable row level security;
alter table active_sessions enable row level security;
alter table notifications enable row level security;
alter table domains enable row level security;
alter table milestones enable row level security;
alter table milestone_submissions enable row level security;
alter table milestone_doubts enable row level security;

-- Milestone Submissions policies (users can only manage their OWN submissions, super_admin can manage all)
drop policy if exists "Allow authenticated read on milestone_submissions" on milestone_submissions;
create policy "Allow authenticated read on milestone_submissions" on milestone_submissions for select using (true);

drop policy if exists "Allow users full access on milestone_submissions" on milestone_submissions;
drop policy if exists "Users manage own submissions" on milestone_submissions;
create policy "Users manage own submissions" on milestone_submissions for all using (auth.uid() = admin_id or public.is_super_admin());

-- Milestone Doubts policies (users can only manage their OWN doubts, super_admin can manage all)
drop policy if exists "Allow authenticated read on milestone_doubts" on milestone_doubts;
create policy "Allow authenticated read on milestone_doubts" on milestone_doubts for select using (true);

drop policy if exists "Allow users full access on milestone_doubts" on milestone_doubts;
drop policy if exists "Users manage own doubts" on milestone_doubts;
create policy "Users manage own doubts" on milestone_doubts for all using (auth.uid() = admin_id or public.is_super_admin());

-- ==========================================
-- Helper Admin check function
-- ==========================================
create or replace function public.is_admin()
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
  );
end;
$$ language plpgsql;

create or replace function public.has_permission(perm text)
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid()
      and (admin_profiles.role = 'super_admin' or perm = any(admin_profiles.permissions))
  );
end;
$$ language plpgsql;

-- Trigger to automatically create or update public.admin_profiles when auth.users is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.admin_profiles (id, email, role, permissions)
  values (
    new.id,
    new.email,
    case 
      when new.email = 'orbitecks@gmail.com' then 'super_admin'
      when not exists (select 1 from public.admin_profiles) then 'super_admin'
      else 'admin'
    end,
    case 
      when new.email = 'orbitecks@gmail.com' then array['edit_copy', 'edit_services', 'edit_portfolio', 'edit_blog', 'edit_settings', 'edit_team']
      when not exists (select 1 from public.admin_profiles) then array['edit_copy', 'edit_services', 'edit_portfolio', 'edit_blog', 'edit_settings', 'edit_team']
      else array['edit_copy']
    end
  )
  on conflict (email) do update
  set id = excluded.id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_super_admin()
returns boolean security definer as $$
begin
  return exists (
    select 1 from public.admin_profiles
    where admin_profiles.id = auth.uid() and admin_profiles.role = 'super_admin'
  );
end;
$$ language plpgsql;

-- ==========================================
-- RLS Policy Definitions
-- ==========================================
-- RLS Policy Definitions
-- ==========================================

-- Protect admin_profiles fields against self-privilege escalation
create or replace function public.protect_admin_profile_fields()
returns trigger as $$
begin
  if not public.has_permission('manage_team') then
    new.role := old.role;
    new.permissions := old.permissions;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_protect_admin_profile_fields on public.admin_profiles;
create trigger trigger_protect_admin_profile_fields
  before update on public.admin_profiles
  for each row execute function public.protect_admin_profile_fields();

-- Admin Profiles
drop policy if exists "Enable read access for authenticated users" on admin_profiles;
create policy "Enable read access for authenticated users" on admin_profiles for select using (true);

drop policy if exists "Enable all actions for super_admins" on admin_profiles;
drop policy if exists "Enable all actions for team managers" on admin_profiles;
create policy "Enable all actions for team managers" on admin_profiles for all to authenticated using (
  public.has_permission('manage_team')
);

drop policy if exists "Allow users to insert their own profile" on admin_profiles;
create policy "Allow users to insert their own profile" on admin_profiles for insert with check (auth.uid() = id);

drop policy if exists "Allow users to update their own profile" on admin_profiles;
create policy "Allow users to update their own profile" on admin_profiles for update using (
  auth.uid() = id or lower(email) = lower(auth.jwt()->>'email')
);

-- Security Definer function to allow newly registered/invited team members to claim their pre-provisioned profile
create or replace function public.claim_admin_profile(user_email text)
returns jsonb as $$
declare
  target_id uuid;
  caller_uid uuid;
  result_profile record;
begin
  caller_uid := auth.uid();
  if caller_uid is null then
    return jsonb_build_object('success', false, 'message', 'Not authenticated');
  end if;

  select id into target_id
  from public.admin_profiles
  where lower(email) = lower(user_email)
  limit 1;

  if target_id is null then
    return jsonb_build_object('success', false, 'message', 'Profile not found');
  end if;

  if target_id != caller_uid then
    -- Clean up temporary notifications and active_sessions for old placeholder ID
    delete from public.notifications where user_id = target_id;
    delete from public.active_sessions where admin_id = target_id;

    -- Update pre-provisioned profile ID to match Auth User ID
    update public.admin_profiles set id = caller_uid where id = target_id;
  end if;

  select * into result_profile from public.admin_profiles where id = caller_uid;
  return jsonb_build_object('success', true, 'profile', row_to_json(result_profile));
end;
$$ language plpgsql security definer;


-- site_settings
drop policy if exists "Allow public read of settings" on site_settings;
create policy "Allow public read of settings" on site_settings for select using (true);

drop policy if exists "Allow write access for admins" on site_settings;
create policy "Allow write access for admins" on site_settings for all using (public.has_permission('edit_settings'));

-- homepage_copy
drop policy if exists "Allow public read of copy" on homepage_copy;
create policy "Allow public read of copy" on homepage_copy for select using (true);

drop policy if exists "Allow write access for admins" on homepage_copy;
create policy "Allow write access for admins" on homepage_copy for all using (public.has_permission('edit_copy'));

-- services
drop policy if exists "Allow public read of services" on services;
create policy "Allow public read of services" on services for select using (true);

drop policy if exists "Allow write access for admins" on services;
create policy "Allow write access for admins" on services for all using (public.has_permission('edit_services'));

-- projects
drop policy if exists "Allow public read of projects" on projects;
create policy "Allow public read of projects" on projects for select using (true);

drop policy if exists "Allow write access for admins" on projects;
create policy "Allow write access for admins" on projects for all using (public.has_permission('edit_portfolio'));

-- articles
drop policy if exists "Allow public read of articles" on articles;
create policy "Allow public read of articles" on articles for select using (true);

drop policy if exists "Allow write access for admins" on articles;
create policy "Allow write access for admins" on articles for all using (public.has_permission('edit_blog'));

-- about_page_settings
drop policy if exists "Allow public read of about_settings" on about_page_settings;
create policy "Allow public read of about_settings" on about_page_settings for select using (true);

drop policy if exists "Allow write access for admins" on about_page_settings;
create policy "Allow write access for admins" on about_page_settings for all using (public.has_permission('edit_copy'));

-- services_page_settings
drop policy if exists "Allow public read of services_settings" on services_page_settings;
create policy "Allow public read of services_settings" on services_page_settings for select using (true);

drop policy if exists "Allow write access for admins" on services_page_settings;
create policy "Allow write access for admins" on services_page_settings for all using (public.has_permission('edit_services'));

-- portfolio_page_settings
drop policy if exists "Allow public read of portfolio_settings" on portfolio_page_settings;
create policy "Allow public read of portfolio_settings" on portfolio_page_settings for select using (true);

drop policy if exists "Allow write access for admins" on portfolio_page_settings;
create policy "Allow write access for admins" on portfolio_page_settings for all using (public.has_permission('edit_portfolio'));

-- contact_page_settings
drop policy if exists "Allow public read of contact_settings" on contact_page_settings;
create policy "Allow public read of contact_settings" on contact_page_settings for select using (true);

drop policy if exists "Allow write access for admins" on contact_page_settings;
create policy "Allow write access for admins" on contact_page_settings for all using (public.has_permission('edit_copy'));

-- consultation_page_settings
drop policy if exists "Allow public read of consultation_settings" on consultation_page_settings;
create policy "Allow public read of consultation_settings" on consultation_page_settings for select using (true);

drop policy if exists "Allow write access for admins" on consultation_page_settings;
create policy "Allow write access for admins" on consultation_page_settings for all using (public.has_permission('edit_settings'));

-- Tasks policies
drop policy if exists "Allow admins to read tasks" on tasks;
create policy "Allow admins to read tasks" on tasks for select using (public.is_admin());

drop policy if exists "Allow super_admins full access to tasks" on tasks;
drop policy if exists "Allow team managers full access to tasks" on tasks;
create policy "Allow team managers full access to tasks" on tasks for all using (public.has_permission('manage_team'));

drop policy if exists "Allow user to update task status" on tasks;
create policy "Allow user to update task status" on tasks for update using (auth.uid() = assigned_to);

-- Daily Reports policies
drop policy if exists "Allow admins to read all reports" on daily_reports;
create policy "Allow admins to read all reports" on daily_reports for select using (public.is_admin());

drop policy if exists "Allow users to read their own reports" on daily_reports;
create policy "Allow users to read their own reports" on daily_reports for select using (auth.uid() = member_id);

drop policy if exists "Allow users to insert their own reports" on daily_reports;
create policy "Allow users to insert their own reports" on daily_reports for insert with check (auth.uid() = member_id);

drop policy if exists "Allow users to update their own reports" on daily_reports;
create policy "Allow users to update their own reports" on daily_reports for update using (auth.uid() = member_id);

drop policy if exists "Allow super_admins full access to reports" on daily_reports;
drop policy if exists "Allow team managers full access to reports" on daily_reports;
create policy "Allow team managers full access to reports" on daily_reports for all using (public.has_permission('manage_team'));

-- Activity Logs policies
drop policy if exists "Allow super_admins to read logs" on activity_logs;
drop policy if exists "Allow admins with view_logs to read logs" on activity_logs;
create policy "Allow admins with view_logs to read logs" on activity_logs for select using (public.has_permission('view_logs'));

drop policy if exists "Allow admins to insert logs" on activity_logs;
create policy "Allow admins to insert logs" on activity_logs for insert with check (public.is_admin());

drop policy if exists "Allow super_admins to delete logs" on activity_logs;
drop policy if exists "Allow admins with view_logs to delete logs" on activity_logs;
create policy "Allow admins with view_logs to delete logs" on activity_logs for delete using (public.has_permission('view_logs'));

-- Active Sessions policies
drop policy if exists "Allow users to read their own active sessions" on active_sessions;
create policy "Allow users to read their own active sessions" on active_sessions for select using (auth.uid() = admin_id);

drop policy if exists "Allow users to insert their own active sessions" on active_sessions;
create policy "Allow users to insert their own active sessions" on active_sessions for insert with check (auth.uid() = admin_id);

drop policy if exists "Allow users to update their own active sessions" on active_sessions;
create policy "Allow users to update their own active sessions" on active_sessions for update using (auth.uid() = admin_id);

drop policy if exists "Allow users to delete their own active sessions" on active_sessions;
create policy "Allow users to delete their own active sessions" on active_sessions for delete using (auth.uid() = admin_id);

drop policy if exists "Allow super_admins to read all active sessions" on active_sessions;
drop policy if exists "Allow managers to read all active sessions" on active_sessions;
create policy "Allow managers to read all active sessions" on active_sessions for select using (public.has_permission('view_logs') or public.has_permission('manage_team'));

-- Enforce Max 2 Active Devices per Admin in active_sessions table at DB level
create or replace function public.enforce_active_session_device_limit()
returns trigger as $$
declare
  session_count integer;
begin
  select count(*) into session_count
  from public.active_sessions
  where admin_id = NEW.admin_id
    and device_id != NEW.device_id;

  if session_count >= 2 then
    raise exception 'Device limit reached: Account is restricted to a maximum of 2 active device sessions.';
  end if;

  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists check_device_limit_before_insert on public.active_sessions;
create trigger check_device_limit_before_insert
  before insert on public.active_sessions
  for each row execute function public.enforce_active_session_device_limit();

-- Notifications policies (row-scoped for security)
drop policy if exists "Allow authenticated read notifications" on notifications;
drop policy if exists "Allow authenticated insert notifications" on notifications;
drop policy if exists "Allow delete notifications for manage_all_notifications" on notifications;
drop policy if exists "Users can view own notifications" on notifications;
drop policy if exists "Users can update own notifications" on notifications;
drop policy if exists "Users can delete own notifications" on notifications;
drop policy if exists "Allow insert for notification managers" on notifications;

-- Users can only see their own notifications
create policy "Users can view own notifications" on notifications
  for select using (auth.uid() = user_id);

-- Super admins / notification managers can also read all notifications
create policy "Allow notification managers to read all" on notifications
  for select using (public.has_permission('manage_all_notifications'));

-- Trigger functions (SECURITY DEFINER) insert notifications server-side.
-- Notification managers can also insert manually for any user.
create policy "Allow insert for notification managers" on notifications
  for insert with check (public.has_permission('manage_all_notifications'));

-- Users can mark their own notifications as read
create policy "Users can update own notifications" on notifications
  for update using (auth.uid() = user_id);

-- Users can delete their own notifications
create policy "Users can delete own notifications" on notifications
  for delete using (auth.uid() = user_id);

-- Notification managers can delete any notification
create policy "Allow delete notifications for manage_all_notifications" on notifications
  for delete using (public.has_permission('manage_all_notifications'));

-- ==========================================
-- Auto updated_at Trigger Function
-- ==========================================
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

-- Apply updated_at auto-triggers on tables that have updated_at columns
drop trigger if exists set_updated_at on tasks;
create trigger set_updated_at before update on tasks
  for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at on daily_reports;
create trigger set_updated_at before update on daily_reports
  for each row execute function public.update_updated_at_column();


-- ==========================================
-- Initial Seeding Script (Existing Content Defaults)
-- ==========================================
insert into site_settings (id, brand_name, logo_first, logo_second, contact_email, contact_phone, contact_location, contact_hours, social_instagram, social_linkedin, social_github)
values (
  1, 
  'Orbitecks', 
  'Orbi', 
  'tecks', 
  'hello@orbitecks.agency', 
  '+91 98765 43210', 
  'Bangalore, Karnataka, India', 
  'Mon - Fri, 9am - 6pm IST',
  'https://instagram.com/orbitecks',
  'https://linkedin.com/company/orbitecks',
  'https://github.com/orbitecks'
) on conflict (id) do nothing;

insert into homepage_copy (id, hero_tag, hero_title_main, hero_title_sub, hero_title_accent, hero_description, cta_badge, cta_title, cta_description, brands, about_snippet, process_section, testimonials_section, cta_banner, hero_stats, hero_analytics_card, hero_float_cards)
values (
  1,
  'Creative Digital Agency',
  'Awesome',
  'Solution For',
  'Your Business',
  'We create powerful digital experiences that elevate brands and drive measurable growth. From strategy to execution, we''re your creative partner.',
  'Work With Us',
  'Ready to Scale Your Business?',
  'Let us work together to design and engineer a digital solution that exceeds expectations.',
  '[{"name":"DocuSign"},{"name":"maze"},{"name":"Culture Amp"},{"name":"HELLOSIGN"},{"name":"alten"},{"name":"Greenish"},{"name":"Flatnet"}]'::jsonb,
  '{"label":"About Agency","title":"Powerful Agency\\nFor Corporate\\nBusiness.","description":"We''re a full-service creative agency specializing in brand identity, digital marketing, and web development. Since 2020, we''ve helped 500+ businesses grow their digital presence and achieve measurable results.","btn":{"text":"Read More →","to":"/about"},"stat":{"number":"28","yearsText":"Years","expText1":"Working","expText2":"Experience"},"features":["Award-winning creative team","Data-driven strategy & execution","Full-service digital solutions","Dedicated project management"],"imgs":{"team":"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&fit=crop","office":"https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80&fit=crop"}}'::jsonb,
  '{"label":"Our Process","title":"Understand The\\nBusiness Process.","description":"We follow a proven, systematic process to ensure every project is delivered on time, on budget, and exceeds expectations. Here''s how we work.","btn":{"text":"Learn More →","to":"/services"},"images":[{"title":"Discussion of the Idea","img":"https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&fit=crop","className":"tall","icon":"💡"},{"title":"Planning & Strategy","img":"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop","className":"short","icon":"📐"},{"title":"Launch & Growth","img":"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&fit=crop","className":"medium","icon":"🚀"}],"steps":[{"num":"Step 01","title":"Discovery","desc":"We start by understanding your business, goals, and target audience through deep research."},{"num":"Step 02","title":"Strategy","desc":"We craft a tailored strategy aligned with your objectives and market positioning."},{"num":"Step 03","title":"Execution","desc":"Our team brings the strategy to life with precision, creativity, and technical excellence."},{"num":"Step 04","title":"Results","desc":"We measure, optimize, and iterate to ensure you achieve and exceed your KPIs."}]}'::jsonb,
  '{"label":"Testimonials","title":"Trusted By The World''s Fastest\\nGrowing Companies","logos":["maze","Culture Amp","HELLOSIGN","Greenish","Flatnet","alten"],"list":[{"text":"\\\"Working with Orbitecks transformed our digital presence completely. Their strategic approach and creative excellence delivered results beyond our expectations.\\\"","name":"Matthew Miller","role":"CEO, Greenish Co.","initials":"MM","company":"Greenish"},{"text":"\\\"The team''s attention to detail and commitment to our vision was remarkable. They delivered a stunning website that truly represents our brand.\\\"","name":"Sarah Chen","role":"Marketing Director, Flatnet","initials":"SC","company":"Flatnet"},{"text":"\\\"Orbitecks'' SEO work tripled our organic traffic in just 4 months. Their data-driven approach is exactly what we needed to scale.\\\"","name":"James Wilson","role":"Founder, Culture Amp","initials":"JW","company":"Culture Amp"},{"text":"\\\"Exceptional quality and professional service throughout. Orbitecks built our Shopify store from scratch and it''s been generating sales day one.\\\"","name":"Emily Rodriguez","role":"E-Commerce Manager","initials":"ER","company":"ShopElite"},{"text":"\\\"The brand identity they created for us perfectly captures our mission. Every element is intentional and the results speak for themselves.\\\"","name":"David Park","role":"Creative Director, Maze","initials":"DP","company":"Maze"},{"text":"\\\"From initial concept to launch, the Orbitecks team was professional, responsive, and delivered exactly what we envisioned — and more.\\\"","name":"Lisa Thompson","role":"COO, DocuSign Partner","initials":"LT","company":"DocuSign"}]}'::jsonb,
  '{"badge":"◎ Creative Solutions","title":"We Make The Creative\\nSolutions For Problems","description":"Our team of experts crafts innovative digital solutions tailored to your unique business challenges. Let''s create something extraordinary together.","btnPrimary":{"text":"Free Consultation →","to":"/consultation"},"btnSecondary":{"text":"See Our Work","to":"/portfolio"},"image":{"img":"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=900&q=80&fit=crop","qualityText":"We Make The Quality","workText":"Work Never Stops"}}'::jsonb,
  '[]'::jsonb,
  '{"title":"Performance Score","score":"99","total":"/ 100","stat":"↑ +12%","img":"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&fit=crop","mainPersonImg":"https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80&fit=crop"}'::jsonb,
  '{"successRate":{"value":"99%","label":"Success Rate"},"decidedQuality":{"title1":"Decided","title2":"Quality","subtitle":"Guaranteed"},"happyClients":{"value":"500+","label":"Happy Clients"}}'::jsonb
) on conflict (id) do nothing;

-- Core services seeding from static data
insert into services (id, title, desc_short, icon_name, detail_title, detail_desc, sort_order)
values 
  ('brand-identity', 'Brand Identity', 'Logos, typography, color systems, and complete brand guidelines.', '✦', '', '', 0),
  ('web-design-dev', 'Web Design & Dev', 'Beautiful, fast, and conversion-optimized websites built with modern technologies.', '⬡', '', '', 1),
  ('seo-growth', 'SEO & Growth', 'Data-driven SEO strategies that improve rankings and drive sustainable organic growth.', '◎', '', '', 2),
  ('shopify-ecommerce', 'Shopify & E-Commerce', 'High-converting e-commerce stores with seamless UX and powerful backend integrations.', '◈', '', '', 3),
  ('ui-ux-design', 'UI/UX Design', 'User research, wireframing, prototyping, and polished interfaces.', '⊕', '', '', 4),
  ('digital-marketing', 'Digital Marketing', 'Full-funnel campaigns across paid ads, social media, email, and content.', '▣', '', '', 5),
  ('motion-video', 'Motion & Video', 'Brand films, motion graphics, and social content.', '◇', '', '', 6),
  ('content-strategy', 'Content Strategy', 'Strategic content planning, copywriting, and editorial calendars.', '◉', '', '', 7),
  ('analytics-cro', 'Analytics & CRO', 'Data analysis, A/B testing, and conversion rate optimization.', '⬤', '', '', 8)
on conflict (id) do nothing;

-- Clean database: Ensure demo projects and demo blogs are removed
delete from public.projects;
delete from public.articles;


-- About page seeding
insert into about_page_settings (id, hero_tag, hero_title_main, hero_title_accent, hero_title_end, hero_description, stats, mission_label, mission_title, mission_description1, mission_description2, mission_image_url, mission_image_label, mission_image_subtext, team_label, team_title, values_label, values_title, values_list, cta_label, cta_title, cta_description)
values (
  1,
  'About Us',
  'We Are A',
  'Creative',
  'Digital Agency',
  'Since 2020, we''ve been helping businesses of all sizes transform their digital presence. Our passionate team of 25+ experts crafts exceptional experiences that drive real growth.',
  '[{"val":"500","unit":"+","desc":"Projects Completed"},{"val":"28","unit":"+","desc":"Years Experience"},{"val":"25","unit":"+","desc":"Team Members"},{"val":"4.9","unit":"★","desc":"Average Rating"}]'::jsonb,
  'Our Mission',
  'Powerful Agency For\nCorporate Business.',
  'Our mission is to empower businesses with cutting-edge digital solutions that drive measurable results. We believe every brand deserves world-class creative and strategic support, regardless of size.',
  'Founded in 2020, Orbitecks has grown into a full-service digital agency trusted by startups and Fortune 500 companies alike. Our diverse team brings expertise across design, development, strategy, and marketing.',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fit=crop',
  'Trusted Worldwide',
  '500+ Happy Clients across 30+ Countries',
  'Our Team',
  'Meet The People Behind\nThe Magic',
  'What We Stand For',
  'Our Core Values',
  '[{"icon":"✦","title":"Creative Excellence","desc":"We push the boundaries of design and innovation to deliver work that truly stands out in the market."},{"icon":"◎","title":"Client-First","desc":"Your success is our success. We build deep partnerships and are invested in your long-term growth."},{"icon":"⬡","title":"Data-Driven","desc":"Every decision is backed by research, analytics, and measurable outcomes — no guesswork."},{"icon":"◈","title":"Transparency","desc":"Open communication, honest timelines, and clear pricing. No surprises, just results."},{"icon":"▣","title":"Agility","desc":"We adapt quickly to market changes and evolving client needs with fast, iterative execution."},{"icon":"⊕","title":"Impact","desc":"We measure our success by the real business impact our work creates for our clients."}]'::jsonb,
  'Work With Us',
  'Ready To Elevate Your Brand?',
  'Let''s discuss your project and create something extraordinary together.'
) on conflict (id) do nothing;

-- Services page settings seeding
insert into services_page_settings (id, hero_tag, hero_title_main, hero_title_accent, hero_description, expertise_label, expertise_title, process_label, process_title, process_description, process_image_url, process_roi_label, process_roi_value, pricing_label, pricing_title, pricing_packages, cta_title, cta_description, cta_btn_text)
values (
  1,
  'What We Offer',
  'Services That Drive',
  'Real Results',
  'From brand identity to full digital transformation — we offer a comprehensive suite of services to elevate your business at every stage.',
  'Our Expertise',
  'Everything You Need To\nGrow Your Business',
  'How We Work',
  'Our Proven Process\nFor Success',
  'We''ve refined our workflow over years of working with hundreds of clients. Every project follows a structured process that ensures quality, transparency, and results.',
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=900&q=80&fit=crop',
  'Average Project ROI',
  '342%',
  'Transparent Pricing',
  'Simple, Clear Packages',
  '[{"name":"Starter","price":"₹2,00,000","period":"/project","desc":"Perfect for startups and small businesses looking to establish their digital presence.","features":["Brand Identity Design","Landing Page Design","SEO Foundation","Social Media Kit","30-day Support"],"highlight":false},{"name":"Growth","price":"₹6,00,000","period":"/project","desc":"Complete digital transformation for growing businesses ready to scale.","features":["Full Brand Identity","Multi-page Website","SEO Strategy & Setup","Content Strategy","Shopify Store Setup","Analytics Dashboard","90-day Support"],"highlight":true},{"name":"Enterprise","price":"Custom","period":"","desc":"Comprehensive agency partnership for established businesses and corporations.","features":["Everything in Growth","Dedicated Account Manager","Custom Development","Ongoing Marketing","Quarterly Strategy Review","Priority Support","Custom SLA"],"highlight":false}]'::jsonb,
  'Ready To Get Started?',
  'Book your free consultation today and let''s discuss how we can transform your business.',
  'Book Free Consultation →'
) on conflict (id) do nothing;

-- Portfolio page settings seeding
insert into portfolio_page_settings (id, hero_tag, hero_title_main, hero_title_accent, hero_description, stats, categories, cta_title, cta_description)
values (
  1,
  'Our Work',
  'Projects That',
  'Define Us',
  'Explore our latest client collaborations, visual redesigns, software applications, and search engine optimization case studies.',
  '[{"val":"500+","label":"Projects Finished"},{"val":"99%","label":"Client Satisfaction"},{"val":"3.5X","label":"Average Growth ROI"}]'::jsonb,
  '["All", "Branding", "Web Design", "Development", "SEO"]'::jsonb,
  'Ready To Build Something Amazing?',
  'Let''s discuss your objectives and build a digital solution that translates into growth.'
) on conflict (id) do nothing;

-- Contact page settings seeding
insert into contact_page_settings (id, hero_tag, hero_title_main, hero_title_accent, hero_description, info_label, info_title, info_description, faq_items, trust_strip)
values (
  1,
  'Get In Touch',
  'Let''s Start A',
  'Conversation',
  'Whether you have a project in mind or just want to explore possibilities, we''d love to hear from you. Our team typically responds within 24 hours.',
  'Contact Details',
  'We''re Here To\\nHelp You Succeed',
  'Reach out through any channel below, or fill in the form and we''ll get back to you within one business day.',
  '[{"q":"How long does a typical project take?","a":"Project timelines vary based on scope. A brand identity typically takes 4–6 weeks, while a full website can take 8–12 weeks. We always provide a clear timeline before starting."},{"q":"Do you work with businesses outside the US?","a":"Absolutely! We work with clients globally. Our team is experienced in working across time zones and communicating effectively with international clients."},{"q":"What is your design process?","a":"We follow a 4-phase process: Discovery, Strategy, Design/Build, and Launch. Each phase includes client reviews and feedback sessions to ensure alignment."},{"q":"Do you offer ongoing retainer services?","a":"Yes! We offer monthly retainer packages for ongoing design, development, and marketing support. Contact us for custom retainer pricing."}]'::jsonb,
  '[{"icon":"lightning","label":"24h Response Time"},{"icon":"lock","label":"NDA Available"},{"icon":"globe","label":"Global Clients"},{"icon":"star","label":"4.9/5 Rating"},{"icon":"check","label":"Satisfaction Guarantee"}]'::jsonb
) on conflict (id) do nothing;

-- Consultation page settings seeding
insert into consultation_page_settings (id, hero_badge, hero_title, hero_description, steps, success_title, success_desc, success_btn_home, success_btn_work, slots, expect_title, expect_subtitle, expect_list, trust_badges, budgets)
values (
  1,
  '✦ Free, No-Commitment Consultation',
  'Book Your Free\nConsultation',
  '30 minutes with our senior strategist. We''ll review your goals, explore solutions, and outline a clear roadmap — completely free.',
  '[{"label":"Your Details","icon":"👤"},{"label":"Project Info","icon":"📋"},{"label":"Schedule","icon":"📅"}]'::jsonb,
  'You''re All Set!',
  'Your consultation request has been received. Our team will confirm your slot and send you a calendar invite within 24 hours.',
  'Back to Home',
  'Explore Our Work',
  '["Mon Jul 7, 10am", "Mon Jul 7, 2pm", "Tue Jul 8, 11am", "Tue Jul 8, 3pm", "Wed Jul 9, 10am", "Thu Jul 10, 2pm"]'::jsonb,
  'What To Expect',
  'Here''s what happens during your free 30-minute consultation',
  '[{"icon":"target","title":"Goal Alignment","desc":"We discuss your business objectives and challenges to ensure we understand exactly what success looks like for you."},{"icon":"bulb","title":"Strategy Overview","desc":"Our expert will outline a high-level strategy tailored to your specific needs, industry, and budget."},{"icon":"map","title":"Clear Roadmap","desc":"You''ll leave with a clear action plan and next steps, whether you decide to work with us or not."}]'::jsonb,
  '["✓ Completely Free", "✓ No Obligation", "✓ 30 Minutes", "✓ Senior Strategist"]'::jsonb,
  '["Under ₹15,000", "₹15,000 – ₹30,000", "₹30,000 – ₹60,000", "₹60,000 – ₹1,00,000", "₹1,00,000+"]'::jsonb
) on conflict (id) do nothing;



-- Seed primary Super Admin profile record matching your actual auth UID if signed up
insert into public.admin_profiles (id, email, role, permissions)
select 
  id, 
  email, 
  'super_admin', 
  array['edit_copy', 'edit_services', 'edit_portfolio', 'edit_blog', 'edit_settings', 'edit_team']
from auth.users
where email = 'orbitecks@gmail.com'
on conflict (id) do nothing;

-- Seed default fallback Super Admin profile if no profile was created above
insert into public.admin_profiles (id, email, role, permissions)
select 
  'b3606d55-871c-4782-83d8-718301b831dd'::uuid, 
  'orbitecks@gmail.com', 
  'super_admin', 
  array['edit_copy', 'edit_services', 'edit_portfolio', 'edit_blog', 'edit_settings', 'edit_team']
where not exists (select 1 from public.admin_profiles where email = 'orbitecks@gmail.com')
on conflict (id) do nothing;

-- Elevate your email account to Super Admin if it's already registered
update public.admin_profiles
set role = 'super_admin',
    permissions = array['edit_copy', 'edit_services', 'edit_portfolio', 'edit_blog', 'edit_settings', 'edit_team']
where email = 'orbitecks@gmail.com';

-- NOTE: Storage bucket initialization and RLS policies are consolidated at end of file (line ~1815+)

-- Create policies table
create table if not exists public.policies (
  id text primary key,
  title text not null,
  description text,
  last_updated text not null,
  content text not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.policies enable row level security;

-- Policies RLS
drop policy if exists "Allow public read access to policies" on public.policies;
create policy "Allow public read access to policies" on public.policies
  for select using (true);

drop policy if exists "Allow admins to update policies" on public.policies;
create policy "Allow admins to update policies" on public.policies
  for all using (public.has_permission('edit_policies'));

-- Seed policies
insert into public.policies (id, title, description, last_updated, content) values
(
  'terms',
  'Terms of Service',
  'Read Orbitecks''s terms of service. Understand the guidelines, payment cycles, service scopes, and engagement requirements for our agency.',
  'July 4, 2026',
  '1. Acceptance of Terms\nBy accessing, browsing, or utilizing the services provided by Orbitecks Creative Agency ("Agency", "We", "Us"), you agree to comply with and be bound by these Terms of Service. If you do not agree, please cease all usage of our service offerings immediately.\n\n2. Scope of Services\nOrbitecks provides digital consultation, branding, website design & development, search engine optimization (SEO), and conversion rate marketing retainer partnerships. Each engagement is governed by a mutually executed Statement of Work (SOW) specifying deliverables, timelines, and budgets.\n\n3. Fees, Payments & Subscriptions\nAll client project fees are invoiced in accordance with agreed milestones inside the project SOW. Invoices must be settled within fourteen (14) business days of issuance. Late payments are subject to a standard 1.5% compounding monthly surcharge. Monthly subscription services are billed upfront and automatically renew.\n\n4. Intellectual Property\nUpon complete final receipt of payments, intellectual property rights, transfer logs, source codes, vectors, and finalized design systems migrate to the client. The Agency retains perpetual, royalty-free rights to display completed designs inside online portfolios and marketing case study compilations.\n\n5. Client Responsibilities\nTo maintain production schedules, clients must provide source resources, content feedback, guidelines, and requested copies within the timeframe specified in the SOW. Project delays resulting from client responsiveness will not constitute breaches of timeline guarantees.\n\n6. Limitation of Liability\nIn no circumstances will Orbitecks be liable for indirect, incidental, special, or consequential damages, including loss of profit or business reputation, arising from site deployments, marketing campaigns, or design updates. Our maximum collective liability is capped at the total amount received from the client for the specific project segment.'
),
(
  'privacy',
  'Privacy Policy',
  'Learn how Orbitecks collects, stores, and protects client files, emails, cookies, and project data under global privacy laws.',
  'July 4, 2026',
  '1. Information We Collect\nWe collect personal information that you provide voluntarily when booking consultations, sending queries, or signing contracts. This includes your name, email, corporate domain, billing coordinates, and project specifications. We also track anonymous usage metrics (IP, device parameters) via browser cookies.\n\n2. How We Use Information\nWe utilize your personal information to schedule consultation events, perform customized client discovery, draft Statements of Work, process payment invoices, and deliver project status updates. We also send periodical digital insights and promotions (which you can opt-out of at any time).\n\n3. Data Security & Storage\nWe implement industry-standard encryption, SSL protocols, and access management profiles to keep your intellectual logs and customer databases secure. However, no digital storage mechanism is 100% impenetrable. We cannot guarantee absolute transmission security.\n\n4. Third-Party Disclosures\nWe do not sell, rent, or trade your corporate information to external advertising brokers. We only share essential metadata with trusted third-party service providers (like payment processors, domain hosts, and project trackers) required to deliver our core services.\n\n5. Your Rights (GDPR & CCPA)\nDepending on your location, you have rights to access, update, export, or delete your personal records stored in our servers. You may contact us at hello@orbitecks.agency to request record clearance.'
),
(
  'refund',
  'Refund & Cancellation Policy',
  'Review Orbitecks''s refund policies. Get information about upfront project milestones, installment policies, and cancellation procedures.',
  'July 4, 2026',
  '1. Deposit Fees & Onboarding\nUpon signing a Statement of Work, a non-refundable upfront deposit (typically 50% of the total project value unless stated otherwise) is required to secure our production schedule and initiate user research. This deposit covers early administrative expenses and cannot be refunded once work begins.\n\n2. Milestone-Based Refund Assessments\nFor multi-phase campaigns, refunds can only be evaluated for upcoming phases that have NOT yet commenced. Once a design milestone (e.g. visual layout approval, frontend coding launch) is approved by the client, the corresponding billing segment is fully locked and non-refundable.\n\n3. Monthly Retainer Services\nMonthly agency retainers (for SEO, marketing support, and ongoing code maintenance) are billed upfront on a recurring schedule. You may cancel your retainer subscription by providing a written notice at least fifteen (15) business days prior to the next billing cycle. Retrospective refunds are not provided for active months.\n\n4. Project Cancellations & Terminations\nEither party may terminate an active project engagement by providing 10 days written notice to the other. Upon cancellation, the client will be invoiced for all accumulated billable hours, completed deliverables, and mockups produced up to the effective termination date.'
),
(
  'nda',
  'Non-Disclosure Agreement (NDA)',
  'Review Orbitecks''s mutual Non-Disclosure Agreement. Learn how we safeguard proprietary records, client assets, and intellectual property.',
  'July 4, 2026',
  '"We hold ourselves to the highest ethical and professional standards. Prior to entering deep project scopes, we provide standard pre-executed mutual NDA paperwork to safeguard your data."\n\n1. Definition of Confidential Information\nConfidential information refers to all proprietary data, product roadmaps, source codes, pricing configurations, operational structures, client listings, and strategic plans disclosed by either party during project discovery or delivery cycles.\n\n2. Non-Disclosure Obligations\nBoth parties agree to hold confidential information in strict confidence and protect it from unauthorized dissemination using the same standard of care used for their own proprietary records (but no less than a reasonable standard of care). Information shall not be shared with external contractors without explicit mutual written consent.\n\n3. Excluded Information\nObligations under this agreement do not apply to information that is: (a) publicly available prior to disclosure, (b) already known to the receiving party, (c) developed independently without referencing confidential files, or (d) legally ordered for disclosure by judicial authorities.\n\n4. Term of Agreement\nConfidentiality restrictions remain actively binding for a period of three (3) years from the initial date of disclosure or for as long as information qualifies as trade secrets under applicable laws.'
)
on conflict (id) do nothing;

-- ==========================================
-- Milestones & Domains Database Migration
-- (Tables already defined above in sections 17-20)
-- ==========================================


-- 4. Add domain_id and secondary_domain_id columns to admin_profiles if they don't exist
ALTER TABLE public.admin_profiles 
ADD COLUMN IF NOT EXISTS domain_id text REFERENCES public.domains(id) ON DELETE SET NULL;

ALTER TABLE public.admin_profiles 
ADD COLUMN IF NOT EXISTS secondary_domain_id text REFERENCES public.domains(id) ON DELETE SET NULL;

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestone_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestone_doubts ENABLE ROW LEVEL SECURITY;

-- 6. Create RLS Policies
-- Domains RLS (only super_admin can create/edit/delete domains)
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON domains;
CREATE POLICY "Allow read access for authenticated users" ON domains FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow write access for authenticated users" ON domains;
DROP POLICY IF EXISTS "Allow super_admin write on domains" ON domains;
CREATE POLICY "Allow super_admin write on domains" ON domains FOR ALL TO authenticated USING (public.is_super_admin());

-- Milestones RLS (only super_admin can create/edit/delete milestones)
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON milestones;
CREATE POLICY "Allow read access for authenticated users" ON milestones FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow write access for authenticated users" ON milestones;
DROP POLICY IF EXISTS "Allow super_admin write on milestones" ON milestones;
CREATE POLICY "Allow super_admin write on milestones" ON milestones FOR ALL TO authenticated USING (public.is_super_admin());

-- Milestone Submissions RLS (users manage own submissions, super_admin manages all)
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON milestone_submissions;
CREATE POLICY "Allow read access for authenticated users" ON milestone_submissions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow full access for authenticated users" ON milestone_submissions;
DROP POLICY IF EXISTS "Users manage own submissions" ON milestone_submissions;
CREATE POLICY "Users manage own submissions" ON milestone_submissions FOR ALL TO authenticated USING (auth.uid() = admin_id OR public.is_super_admin());

-- Milestone Doubts RLS (users manage own doubts, super_admin manages all)
DROP POLICY IF EXISTS "Allow read access for authenticated users" ON milestone_doubts;
CREATE POLICY "Allow read access for authenticated users" ON milestone_doubts FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow full access for authenticated users" ON milestone_doubts;
DROP POLICY IF EXISTS "Users manage own doubts" ON milestone_doubts;
CREATE POLICY "Users manage own doubts" ON milestone_doubts FOR ALL TO authenticated USING (auth.uid() = admin_id OR public.is_super_admin());

-- Doubt edit window enforcement trigger (15-minute window for non-super_admin)
create or replace function public.enforce_doubt_edit_window()
returns trigger as $$
begin
  if public.is_super_admin() then
    return new;
  end if;
  if old.admin_id != auth.uid() then
    raise exception 'You can only edit your own doubts.';
  end if;
  if old.query_text is distinct from new.query_text
     and old.created_at < now() - interval '15 minutes' then
    raise exception 'Edit window expired. Doubts can only be modified within 15 minutes of creation.';
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_enforce_doubt_edit_window on public.milestone_doubts;
create trigger trigger_enforce_doubt_edit_window
  before update on public.milestone_doubts
  for each row execute function public.enforce_doubt_edit_window();

-- 7. Seed initial domains
INSERT INTO domains (id, name) VALUES
  ('aiml', 'AIML'),
  ('data-analytics-data-science', 'DATA ANALYTICS & DATA SCIENCE'),
  ('web-development', 'WEB DEVELOPMENT'),
  ('ui-ux-design', 'UI/UX DESIGN'),
  ('business-development', 'BUSINESS DEVELOPMENT'),
  ('digital-marketing', 'DIGITAL MARKETING'),
  ('compliance-executive', 'COMPLIANCE EXECUTIVE')
ON CONFLICT (id) DO NOTHING;

-- 8. Seed initial milestones
INSERT INTO milestones (domain_id, title, description, sort_order) VALUES
  ('aiml', 'M1. AIML Foundations Documentation', 'Task: Research and write up AI vs ML vs DL, types of ML (supervised/
    unsupervised/reinforcement), the AI development lifecycle,
    real-world applications, 2026 trends, ethics, career paths, and
    the core stack (Python, NumPy, Pandas, Matplotlib, Scikit-learn,
    TensorFlow, PyTorch, OpenCV, Hugging Face, Colab, Git).
Deliverables: 30-40pg doc, learning roadmap, presentation.', 1),
  ('aiml', 'M2. AIML Research Report', 'Task: Research 2021-2026 AI breakthroughs across healthcare,
    agriculture, finance, robotics, cybersecurity, and education.
    Identify 5-7 unsolved problems and explain why they persist,
    which ML technique could help, and what dataset would be needed.
    Propose 10 original AI project ideas for the team.
Deliverables: research report, 10-idea proposal doc.', 2),
  ('aiml', 'M3. Learning Sprint — Beginner (Python & Data Basics)', 'Task: Practice Python fundamentals (variables, loops, functions),
    then NumPy and Pandas basics — arrays, dataframes, reading CSVs,
    simple operations.
Deliverables: 2 practice notebooks (Python, NumPy/Pandas) + code +
    documentation summarizing what was learned.', 3),
  ('aiml', 'M4. Learning Sprint — Intermediate (Visualization & Setup)', 'Task: Practice Matplotlib plotting, set up Git/GitHub, and set up
    Colab/Jupyter/VS Code as your working environment.
Deliverables: 1 practice notebook with visualizations + code + a
    documented environment-setup guide.', 4),
  ('aiml', 'M5. Learning Sprint — Advanced (ML & Tools)', 'Task: Complete a guided Scikit-learn tutorial model, a TensorFlow/
    PyTorch intro notebook, and OpenCV basics. No prior mastery
    assumed — this tier is where beginners catch up before real
    project work begins.
Deliverables: 3 practice notebooks (Scikit-learn, TF/PyTorch, OpenCV)
    + code + documentation + a self-assessment of strengths/
    weaknesses.', 5),
  ('aiml', 'M6. Prompt Engineering — Learn & Practice', 'Task: Learn prompt engineering fundamentals (zero-shot, few-shot,
    chain-of-thought, role prompting, system vs user prompts) using
    ChatGPT/Claude/Copilot. Practice writing prompts for coding,
    debugging, and explaining ML concepts.
Deliverables: practice log of 10+ prompts tried + documentation of
    techniques learned.', 6),
  ('aiml', 'M7. Best AI Prompts for AIML Work', 'Task: Generate and refine prompts for real AIML tasks — generating/
    debugging Python ML code, explaining model outputs, generating
    synthetic data, writing model documentation. Document the 10-20
    best-performing prompts with the AI''s result for each.
Deliverables: doc of 10-20 best prompts + results, organized by use
    case.', 7),
  ('aiml', 'M8. Git & GitHub Workflow', 'Task: Create a repo, practice branching, committing, opening pull
    requests, merging, resolving conflicts, and tracking issues on a
    small practice project. Every future notebook/toolkit must live
    in GitHub from here on.
Deliverables: a repo showing branch/commit/PR history from a
    practice project + documentation.', 8),
  ('aiml', 'M9. Public Dataset Analysis', 'Task: Download a public dataset (Kaggle/UCI/Hugging Face), understand
    its columns, build a data dictionary, handle missing values and
    outliers, run feature analysis, and visualize key patterns.
Deliverables: analysis notebook + code, cleaned dataset, dataset
    report/documentation.', 9),
  ('aiml', 'M10. Build an Original Dataset', 'Task: Design and collect an original dataset (500-1000 records, e.g.
    crop disease, customer purchase, network attack, student
    performance). Define column types, collection method, and
    validation rules.
Deliverables: dataset file, data dictionary, validation rules doc.', 10),
  ('aiml', 'M11. Train & Compare ML Models', 'Task: On your own dataset, preprocess the data, do a train/test
    split, then train Logistic Regression, a Decision Tree, and a
    Random Forest. Compare accuracy, precision, recall, and F1 score.
Deliverables: model notebook + code, metrics comparison table,
    write-up on the best-performing model and why.', 11),
  ('aiml', 'M12. AI Toolkit — Core (v1-v3)', 'Task: Build a Python desktop tool in versions: v1 CSV import +
    dataset summary; v2 missing-value detection, cleaning, export;
    v3 graph generation and correlation matrix.
Deliverables: working toolkit (v1-v3) + code/repo link + usage
    documentation.', 12),
  ('aiml', 'M13. AI Toolkit — ML Layer (v4-v5)', 'Task: Extend the toolkit: v4 algorithm selection, train/save/load
    model, prediction; v5 accuracy report, confusion matrix, feature
    importance, export report.
Deliverables: completed toolkit (v1-v5) + code/repo link + usage doc
    update.', 13),
  ('aiml', 'M14. Mini AI Project (Capstone)', 'Task: Pick one real problem (disease prediction, spam detection, crop
    prediction, customer prediction, or intrusion detection) and
    build the full pipeline: dataset → cleaning → training →
    evaluation → prediction.
Deliverables: capstone notebook/app + code/repo link, dataset used,
    final report.', 14),
  ('aiml', 'M15. Final Presentation', 'Task: Present your research, dataset, models, toolkit, and capstone
    to the team; explain challenges faced, what you learned, and what
    you''d improve next.
Deliverables: slide deck covering research, dataset, models, toolkit,
    capstone, challenges, and learnings.', 15),
  ('data-analytics-data-science', 'M1. DA/DS Foundations Documentation', 'Task: Research and write up Analytics vs Data Science, the data
    lifecycle, the 4 types of analytics (descriptive, diagnostic,
    predictive, prescriptive), industry applications, and the core
    stack (Excel, SQL, Python, Pandas, Power BI/Tableau, Streamlit).
Deliverables: documentation, roadmap, presentation.', 1),
  ('data-analytics-data-science', 'M2. Research Report', 'Task: Research how data science has solved real problems (2021-2026)
    in healthcare, finance, retail, agriculture, and education.
    Identify problems still unsolved and propose 10 original analytics
    ideas.
Deliverables: research report, 10-idea proposal doc.', 2),
  ('data-analytics-data-science', 'M3. Learning Sprint — Beginner (SQL & Python Basics)', 'Task: Practice SQL queries (SELECT, JOIN, GROUP BY) and Python/
    Pandas/NumPy basics — reading files, dataframes, simple stats.
Deliverables: 2 practice files (SQL, Python/Pandas) + code +
    documentation summarizing what was learned.', 3),
  ('data-analytics-data-science', 'M4. Learning Sprint — Intermediate (Dashboards)', 'Task: Set up Git/GitHub, then build a guided beginner dashboard in
    Power BI or Tableau using a sample dataset.
Deliverables: 1 guided dashboard + code/file + a documented
    environment-setup guide.', 4),
  ('data-analytics-data-science', 'M5. Learning Sprint — Advanced (Apps & Tools)', 'Task: Build a basic Streamlit app and practice deeper Power BI/
    Tableau features (filters, KPIs). No prior mastery assumed — this
    tier is where beginners catch up before real project work begins.
Deliverables: 1 Streamlit app + code + documentation + a self-
    assessment of strengths/weaknesses.', 5),
  ('data-analytics-data-science', 'M6. Prompt Engineering — Learn & Practice', 'Task: Learn prompt engineering fundamentals (zero-shot, few-shot,
    chain-of-thought, role prompting, system vs user prompts) using
    ChatGPT/Claude/Copilot. Practice writing prompts for SQL queries,
    data cleaning scripts, and explaining analytics concepts.
Deliverables: practice log of 10+ prompts tried + documentation of
    techniques learned.', 6),
  ('data-analytics-data-science', 'M7. Best AI Prompts for Data Analytics Work', 'Task: Generate and refine prompts for real DA/DS tasks — generating
    SQL/Python cleaning scripts, writing dashboard insight summaries,
    explaining statistical results. Document the 10-20 best-
    performing prompts with the AI''s result for each.
Deliverables: doc of 10-20 best prompts + results, organized by use
    case.', 7),
  ('data-analytics-data-science', 'M8. Git & GitHub Workflow', 'Task: Create a repo, practice branching, committing, pull requests,
    merges, and conflict resolution on a small practice project. All
    future work must live in GitHub.
Deliverables: a repo showing branch/commit/PR history from a
    practice project + documentation.', 8),
  ('data-analytics-data-science', 'M9. Public Dataset Analysis', 'Task: Download a public dataset, clean it, profile it, run statistics,
    and build visualizations that surface real insights.
Deliverables: notebook + code, cleaned dataset, report,
    visualizations.', 9),
  ('data-analytics-data-science', 'M10. Build an Original Dataset', 'Task: Design and collect an original dataset (500-1000 records, e.g.
    sales, employee, hospital, agriculture, inventory) with full
    documentation and validation rules.
Deliverables: dataset (500-1000 records), data dictionary, validation
    rules doc.', 10),
  ('data-analytics-data-science', 'M11. Dashboard Development (v1-v3)', 'Task: Build a dashboard in versions: v1 basic charts; v2 interactive
    filters and KPIs; v3 business insights and recommendations, using
    Power BI or Streamlit.
Deliverables: working dashboard (Power BI or Streamlit) + code/file
    + short walkthrough doc.', 11),
  ('data-analytics-data-science', 'M12. Data Toolkit — Core (v1-v2)', 'Task: Build a Python app: v1 import CSV/Excel; v2 cleaning, duplicate
    removal, missing-value detection.
Deliverables: working toolkit (v1-v2) + code/repo link + usage doc.', 12),
  ('data-analytics-data-science', 'M13. Data Toolkit — Reporting Layer (v3-v5)', 'Task: Extend the toolkit: v3 statistics/profiling; v4 chart generation
    (bar, pie, line, histogram, correlation); v5 exportable business
    report (PDF/CSV/Excel).
Deliverables: completed toolkit (v1-v5) + code/repo link + usage doc
    update.', 13),
  ('data-analytics-data-science', 'M14. Business Intelligence Capstone', 'Task: Pick a sector (sales, healthcare, agriculture, education, or
    finance), build a dashboard with real insights and
    recommendations, and add an optional trend prediction.
Deliverables: sector dashboard + code/file, insights doc,
    recommendations report.', 14),
  ('data-analytics-data-science', 'M15. Final Presentation', 'Task: Present your documentation, research, dataset, dashboard,
    toolkit, and BI report to the team, explaining how this work can
    be reused.
Deliverables: slide deck covering documentation, research, dataset,
    dashboard, toolkit, BI report.', 15),
  ('web-development', 'M1. Web Development Foundations Documentation', 'Task: Research and write up frontend/backend/full-stack, client-
    server architecture, HTTP/HTTPS, DNS/hosting/SSL, REST vs
    GraphQL, auth, JWT, security basics, SEO, performance, PWAs, and
    why PHP stays in the stack (shared-hosting clients still need it).
Deliverables: 20-40pg doc, architecture diagrams, presentation.', 1),
  ('web-development', 'M2. Technology Stack Research & Decision', 'Task: Compare frontend/backend/DB/deployment options, including PHP
    vs Node/Supabase for different project types (shared hosting vs
    modern cloud hosting), and write a final recommendation.
Deliverables: comparison doc + final stack recommendation write-up.', 2),
  ('web-development', 'M3. Learning Sprint — Beginner (HTML/CSS/JS)', 'Task: Practice HTML/CSS/JS basics — build small static pages, basic
    styling, DOM interactions.
Deliverables: 2-3 small practice pages + code + documentation
    summarizing what was learned.', 3),
  ('web-development', 'M4. Learning Sprint — Intermediate (TypeScript, React & Tailwind)', 'Task: Complete a small TypeScript exercise, build a basic React
    component, and practice Tailwind styling.
Deliverables: 1 practice component (TS + Tailwind) + code +
    documentation.', 4),
  ('web-development', 'M5. Learning Sprint — Advanced (PHP & Supabase)', 'Task: Write a simple PHP script (form handling + MySQL connection)
    and complete a Supabase quick-start. No prior mastery assumed —
    this tier is where beginners catch up before real project work
    begins.
Deliverables: 1 PHP script + 1 Supabase quick-start project + code +
    documentation + a self-assessment of strengths/weaknesses.', 5),
  ('web-development', 'M6. Prompt Engineering — Learn & Practice', 'Task: Learn prompt engineering fundamentals (zero-shot, few-shot,
    chain-of-thought, role prompting, system vs user prompts) using
    ChatGPT/Claude/Copilot/Cursor. Practice writing prompts for
    generating and debugging code.
Deliverables: practice log of 10+ prompts tried + documentation of
    techniques learned.', 6),
  ('web-development', 'M7. Best AI Prompts for Web Development Work', 'Task: Generate and refine prompts for real web dev tasks — building
    a website/page from a design, implementing a backend feature,
    hardening security, fixing bugs. Document the 10-20 best-
    performing prompts with the AI''s result for each.
Deliverables: doc of 10-20 best prompts + results, organized by use
    case.', 7),
  ('web-development', 'M8. Git & GitHub Workflow', 'Task: Create a repo, practice branching, pull requests, merges, code
    review, and conflict resolution on a small practice project.
    Every future task lives in GitHub.
Deliverables: a repo showing branch/PR/merge history from a practice
    project + documentation.', 8),
  ('web-development', 'M9. UI-to-Code: Responsive Page Builds', 'Task: Convert designs into responsive, mobile-first pages: a landing
    page, portfolio, business site, blog layout, and dashboard UI.
Deliverables: 5 responsive, mobile-first pages + code (live + repo
    link) + documentation.', 9),
  ('web-development', 'M10. PHP for Shared Hosting', 'Task: Build a PHP + MySQL mini-site with forms, sessions, and CRUD
    operations, suited for shared-hosting clients (e.g. cPanel-based
    hosting). Document when to use this vs the Next.js/Supabase stack.
Deliverables: working PHP/MySQL mini-project + code + short doc on
    when to use PHP vs the Next.js/Supabase stack.', 10),
  ('web-development', 'M11. Reusable Component Library (React/Next.js)', 'Task: Build a growing TypeScript + Tailwind component library —
    navbar, sidebar, footer, cards, forms, tables, modals, alerts —
    with documentation for each component.
Deliverables: component library repo/code + documentation.', 11),
  ('web-development', 'M12. Backend Development with Supabase', 'Task: Build a complete backend: auth (login, registration, Google
    login, roles), database design, CRUD operations, storage, Row
    Level Security, protected routes, and an admin dashboard.
Deliverables: ER diagram, schema doc, working backend demo + code.', 12),
  ('web-development', 'M13. API Integration + Security Implementation', 'Task: Integrate a third-party API (weather/news/AI/maps/payment
    sandbox) with error handling, loading states, and caching. In the
    same project, implement protections against SQL injection, XSS,
    CSRF, and other OWASP Top 10 risks.
Deliverables: working integration + code + security implementation
    doc.', 13),
  ('web-development', 'M14. Hosting & Deployment Practice', 'Task: Deploy projects across different platforms to learn how each
    works: Vercel/Netlify for the Next.js/React project, a free PHP
    host (e.g. InfinityFree/000webhost) for the PHP project, and
    GitHub Pages for a static build. Compare storage, uptime, custom
    domains, and SSL support.
Deliverables: 3 live deployed links + comparison doc of hosting
    platforms (pros/cons/when to use each).', 14),
  ('web-development', 'M15. Performance Optimization', 'Task: Measure Lighthouse score, Core Web Vitals, SEO, and
    accessibility on an existing project, then implement lazy
    loading, image optimization, code splitting, caching, and bundle
    optimization.
Deliverables: before/after performance report + code changes on one
    project.', 15),
  ('web-development', 'M16. Capstone: Client Project Simulation + Final Presentation', 'Task: Build a full business website — auth, dashboard, admin panel,
    CMS, blog, contact form, responsive design, SEO, analytics — and
    deploy it live, treating this as a real client delivery. Present
    architecture, database design, security, and performance choices.
Deliverables: deployed capstone site, repo/code, and presentation
    covering architecture, security, performance, challenges.', 16),
  ('ui-ux-design', 'M1. Intro to UI/UX Documentation', 'Task: Research and write up UI vs UX, design thinking, human-centered
    design, and examples of good vs bad design.
Deliverables: 20-30pg doc + presentation.', 1),
  ('ui-ux-design', 'M2. UX Research Fundamentals & Real-World Problems', 'Task: Research 5-7 real products with known UX failures or problems;
    document what went wrong and what good UX would have solved.
Deliverables: research doc with 5-7 real-world case examples.', 2),
  ('ui-ux-design', 'M3. Learning Sprint — Beginner (Figma Basics)', 'Task: Practice Figma basics — frames, layers, basic shapes, and
    navigation.
Deliverables: 1 practice Figma file + documentation summarizing what
    was learned.', 3),
  ('ui-ux-design', 'M4. Learning Sprint — Intermediate (Auto Layout & Wireframes)', 'Task: Practice Figma auto layout and complete a simple wireframe
    exercise.
Deliverables: 1 practice wireframe file + code/file + documentation.', 4),
  ('ui-ux-design', 'M5. Learning Sprint — Advanced (Prototyping & Fundamentals)', 'Task: Build a basic interactive prototype in Figma, plus a color/
    typography exercise. No prior mastery assumed — this tier is
    where beginners catch up before real project work begins.
Deliverables: 1 prototype file + 1 color/typography exercise +
    documentation + a self-assessment of strengths/weaknesses.', 5),
  ('ui-ux-design', 'M6. Prompt Engineering — Learn & Practice', 'Task: Learn prompt engineering fundamentals (zero-shot, few-shot,
    role prompting, iterative refinement) using ChatGPT/Claude/Figma
    AI/Midjourney-style tools. Practice writing prompts for design
    ideas and image generation.
Deliverables: practice log of 10+ prompts tried + documentation of
    techniques learned.', 6),
  ('ui-ux-design', 'M7. Best AI Prompts for UI/UX Work', 'Task: Generate and refine prompts for real design tasks — generating
    professional logo concepts, UI layout ideas, color palettes, and
    UI microcopy. Document the 10-20 best-performing prompts with the
    AI''s result for each.
Deliverables: doc of 10-20 best prompts + results, organized by use
    case.', 7),
  ('ui-ux-design', 'M8. Design Principles, Color & Typography', 'Task: Study visual hierarchy, contrast, Gestalt principles, Fitts''s/
    Hick''s/Miller''s Law, color psychology, and font pairing. Design 5
    color palettes and 3 typography systems in light and dark themes.
Deliverables: 5 color palettes, 3 typography systems, light/dark
    theme examples + documentation.', 8),
  ('ui-ux-design', 'M9. UX Research (Applied)', 'Task: Pick one live product and run full UX research on it — user
    personas, empathy maps, customer journey maps, and a competitor
    scan.
Deliverables: persona doc, journey map, competitor research doc.', 9),
  ('ui-ux-design', 'M10. Information Architecture & Wireframing', 'Task: Build a sitemap and user flow for an e-commerce-style platform,
    then design low, mid, and high-fidelity wireframes for login,
    dashboard, profile, and checkout screens.
Deliverables: sitemap, user flow diagram, wireframe file/code (login,
    dashboard, profile, checkout) + documentation.', 10),
  ('ui-ux-design', 'M11. Figma Mastery & Design System', 'Task: Learn Figma components, variants, and prototyping, then build a
    complete team Design System (buttons, inputs, cards, nav, tables,
    modals, alerts).
Deliverables: full team Design System file in Figma + documentation.', 11),
  ('ui-ux-design', 'M12. Canva for Quick-Turnaround Design', 'Task: Learn Canva basics — templates, brand kits, resizing for
    different platforms, text/image editing, animations — and use it
    to produce a set of quick marketing/social assets that don''t need
    full Figma design work.
Deliverables: 5-8 Canva assets (social posts, banner, presentation
    slide, poster) + a short doc on when to use Canva vs Figma.', 12),
  ('ui-ux-design', 'M13. Responsive & Accessible Design', 'Task: Design one website across mobile, tablet, and desktop
    breakpoints, then audit an existing live site against WCAG
    guidelines and contrast/keyboard-navigation standards.
Deliverables: one site designed across mobile/tablet/desktop + file +
    accessibility audit report.', 13),
  ('ui-ux-design', 'M14. Dashboard Design Project', 'Task: Design a full SaaS dashboard — login, analytics, tables,
    charts, settings, notifications, user management — in both light
    and dark mode.
Deliverables: full SaaS dashboard design file + documentation, light
    + dark mode.', 14),
  ('ui-ux-design', 'M15. Mobile App Design Project', 'Task: Design a complete mobile app flow — splash screen, login,
    registration, home, search, profile, settings, notifications.
Deliverables: complete mobile app flow file (splash to settings) +
    documentation.', 15),
  ('ui-ux-design', 'M16. Web App Design + Micro-interactions', 'Task: Design a full web app (landing, auth, dashboard, CRUD pages,
    reports, error pages) and add hover states, loading/skeleton
    screens, and transitions as an interactive prototype.
Deliverables: full web app design file + interactive prototype with
    micro-interactions + documentation.', 16),
  ('ui-ux-design', 'M17. Developer Handoff & Redesign Challenge', 'Task: Prepare a real developer handoff package (specs, exported
    assets, design tokens, spacing system). Then pick one poorly
    designed site/app, identify its UX problems, and redesign it.
Deliverables: handoff package (specs/tokens/assets) + a before/after
    redesign case study.', 17),
  ('ui-ux-design', 'M18. Final Capstone & Presentation', 'Task: Design one complete product end-to-end — problem statement,
    research, personas, IA, wireframes, high-fidelity UI, design
    system, responsive screens, interactive prototype, and handoff —
    then present it.
Deliverables: end-to-end product design file (research through
    prototype) + documentation + presentation.', 18),
  ('business-development', 'M1. Business Development Fundamentals Documentation', 'Task: Research and write up what business development is, how it
    differs from sales and marketing, the BD lifecycle, B2B vs B2C,
    required skills, and business ethics.
Deliverables: 25-40pg doc on BD vs sales/marketing, lifecycle, B2B vs
    B2C, skills, ethics.', 1),
  ('business-development', 'M2. Market & Real-World Problem Research', 'Task: Research 10+ target industries (schools, retail, healthcare,
    startups, etc.) and document the real digital-transformation
    problems each one faces.
Deliverables: industry problem-mapping doc (10+ industries).', 2),
  ('business-development', 'M3. Learning Sprint — Beginner (CRM Basics)', 'Task: Set up a CRM account (HubSpot/Zoho basics) and practice adding
    contacts, notes, and simple pipeline stages.
Deliverables: CRM test account with sample entries + documentation
    summarizing what was learned.', 3),
  ('business-development', 'M4. Learning Sprint — Intermediate (LinkedIn & Lead Tools)', 'Task: Practice LinkedIn Sales Navigator basics and set up a Google
    Sheets lead tracker.
Deliverables: 1 sample lead tracker sheet + documentation.', 4),
  ('business-development', 'M5. Learning Sprint — Advanced (Templates & Outreach Tools)', 'Task: Explore email/proposal template tools and prepare a basic
    outreach template set. No prior mastery assumed — this tier is
    where beginners catch up before real project work begins.
Deliverables: 2-3 draft templates + documentation + a self-assessment
    of strengths/weaknesses.', 5),
  ('business-development', 'M6. Prompt Engineering — Learn & Practice', 'Task: Learn prompt engineering fundamentals (zero-shot, few-shot,
    role prompting, iterative refinement) using ChatGPT/Claude.
    Practice writing prompts for research and outreach tasks.
Deliverables: practice log of 10+ prompts tried + documentation of
    techniques learned.', 6),
  ('business-development', 'M7. Best AI Prompts for BDA Work', 'Task: Generate and refine prompts for real BDA tasks — finding/
    researching best-fit clients, summarizing company backgrounds,
    drafting personalized outreach messages. Document the 10-20
    best-performing prompts with the AI''s result for each.
Deliverables: doc of 10-20 best prompts + results, organized by use
    case.', 7),
  ('business-development', 'M8. Company Deep-Dive', 'Task: Research and document the company''s vision, services, target
    industries, and USPs, then rehearse a pitch that explains the
    company in under 2 minutes.
Deliverables: company overview doc + a rehearsed under-2-minute pitch
    (recorded or written script).', 8),
  ('business-development', 'M9. Target Market & Ideal Customer Profile', 'Task: Build Ideal Customer Profiles for small, medium, and enterprise
    segments — pain points, budget, decision-makers, expected ROI.
Deliverables: ICP docs for small/medium/enterprise segments.', 9),
  ('business-development', 'M10. Lead Generation Fundamentals', 'Task: Learn cold/warm/qualified lead concepts, then source 50
    practice leads using LinkedIn, Google Maps, and business
    directories.
Deliverables: practice lead list (50 leads) sourced via LinkedIn/
    Google Maps/directories + documentation.', 10),
  ('business-development', 'M11. CRM & Pipeline Management', 'Task: Set up a CRM pipeline with proper stages and move sample leads
    through it, practicing follow-up scheduling and notes.
Deliverables: CRM pipeline set up with stages + sample leads tracked
    through it.', 11),
  ('business-development', 'M12. Communication & Client-Facing Skills', 'Task: Practice professional email, WhatsApp, and phone/video call
    etiquette; run a mock discovery call and requirement-gathering
    session.
Deliverables: practice email templates + a recorded/mock discovery
    call.', 12),
  ('business-development', 'M13. Cold Outreach Drafting: Emails, Messages & Call Scripts', 'Task: Write a full set of client outreach drafts — 5 cold email
    templates (different industries/openers), 5 cold LinkedIn/
    WhatsApp message templates, a structured cold-call script (opener,
    hook, pitch, objection handling, close), and a follow-up sequence
    (3-4 touchpoints) for non-responders. Practice reading them aloud/
    role-play with a teammate.
Deliverables: cold email templates (5), cold message templates (5),
    call script doc, follow-up sequence doc.', 13),
  ('business-development', 'M14. Proposal Writing & Documentation Templates', 'Task: Build reusable templates for proposals, quotations, scope of
    work, and meeting notes based on a sample client scenario.
Deliverables: proposal, quotation, SOW, and meeting-notes templates.', 14),
  ('business-development', 'M15. Sales Process, Objection Handling & Negotiation', 'Task: Map the full sales cycle from prospecting to delivery, then
    prepare responses to common objections (too expensive, no budget,
    need time, etc.) and study negotiation/upsell tactics.
Deliverables: sales cycle map doc + objection-response script.', 15),
  ('business-development', 'M16. Competitor Analysis & Professional Networking', 'Task: Analyze 15-20 competing companies (services, pricing,
    portfolio, strengths/weaknesses), then optimize your LinkedIn
    profile and practice professional outreach.
Deliverables: competitor analysis of 15-20 companies + optimized
    LinkedIn profile.', 16),
  ('business-development', 'M17. Requirement Analysis + Digital Marketing Literacy', 'Task: Practice converting a mock client discussion into a proper
    requirement document, and learn enough SEO/social/ads/email
    basics to explain how each generates business value.
Deliverables: sample requirement document + short doc explaining how
    SEO/social/ads/email generate business value.', 17),
  ('business-development', 'M18. Capstone: Real Outreach Practice', 'Task: Generate 500 categorized, verified leads; contact 100 real
    businesses using your cold email/message/call drafts; schedule 20
    meetings; run 10 requirement discussions; submit 5 proposals; aim
    for 1 closed project as a team target. Maintain complete CRM
    records throughout.
Deliverables: full CRM records, lead database, final evaluation
    report.', 18),
  ('digital-marketing', 'M1. Digital Marketing Fundamentals Documentation', 'Task: Research and write up what digital marketing is, the marketing
    funnel, customer journey, buyer personas, the DM ecosystem, and
    AI''s role in modern marketing.
Deliverables: 40-60pg doc + PPT covering funnel, customer journey,
    persona, DM ecosystem, AI in marketing.', 1),
  ('digital-marketing', 'M2. Industry & Real-World Problem Research', 'Task: Research 10 industries and document the marketing problems each
    actually faces — visibility, conversion, retention, etc.
Deliverables: industry problem-mapping report.', 2),
  ('digital-marketing', 'M3. Learning Sprint — Beginner (Analytics & Design Basics)', 'Task: Set up Google Analytics/Search Console and practice Canva
    basics (templates, resizing, editing).
Deliverables: 1 analytics setup + 2-3 Canva assets + code/file +
    documentation summarizing what was learned.', 3),
  ('digital-marketing', 'M4. Learning Sprint — Intermediate (Scheduling Tools)', 'Task: Set up a scheduling tool (Buffer/Meta Business Suite) and
    practice building a sample content queue.
Deliverables: 1 sample scheduling setup + documentation.', 4),
  ('digital-marketing', 'M5. Learning Sprint — Advanced (Ads Sandbox)', 'Task: Set up a Google Ads/Meta Ads sandbox account and practice
    building a basic mock campaign. No prior mastery assumed — this
    tier is where beginners catch up before real project work begins.
Deliverables: 1 mock campaign setup + documentation + a self-
    assessment of strengths/weaknesses.', 5),
  ('digital-marketing', 'M6. Prompt Engineering — Learn & Practice', 'Task: Learn prompt engineering fundamentals (zero-shot, few-shot,
    role prompting, iterative refinement) using ChatGPT/Claude.
    Practice writing prompts for content and SEO tasks.
Deliverables: practice log of 10+ prompts tried + documentation of
    techniques learned.', 6),
  ('digital-marketing', 'M7. Best AI Prompts for Digital Marketing Work', 'Task: Generate and refine prompts for real DM tasks — SEO keyword/
    content research, ad copy generation, social captions, content
    calendars. Document the 10-20 best-performing prompts with the
    AI''s result for each.
Deliverables: doc of 10-20 best prompts + results, organized by use
    case.', 7),
  ('digital-marketing', 'M8. Competitor Analysis', 'Task: Analyze 15 competitor companies across SEO, content, ads,
    social media, and identify their strengths and weaknesses.
Deliverables: analysis of 15 competitor companies (SEO, content, ads,
    social, strengths/weaknesses) + documentation.', 8),
  ('digital-marketing', 'M9. Branding Strategy', 'Task: Study brand identity, positioning, voice, and logo/color
    psychology, then apply it to a real or hypothetical brand case.
Deliverables: brand strategy doc applied to a real or hypothetical
    case (identity, positioning, voice, color/logo psychology).', 9),
  ('digital-marketing', 'M10. Website Marketing & SEO', 'Task: Document on-page, off-page, technical, and local SEO, then
    perform a live SEO audit on 3-5 real websites.
Deliverables: SEO documentation + live SEO audit of 3-5 websites.', 10),
  ('digital-marketing', 'M11. Content & Social Media Strategy', 'Task: Study copywriting, storytelling, and content calendars, then
    build a real monthly/weekly social posting plan for the team.
Deliverables: content calendar + real monthly/weekly posting plan for
    the team.', 11),
  ('digital-marketing', 'M12. Video & Email Marketing', 'Task: Research YouTube SEO, video hooks, and scripting, then write a
    set of sample video scripts and 10-15 email templates (welcome,
    cold, follow-up, newsletter).
Deliverables: sample video script set + 10-15 email templates.', 12),
  ('digital-marketing', 'M13. Lead Generation & Paid Advertising', 'Task: Study organic and paid lead channels, then build 1-2 demo ad
    campaigns (Google/Meta) and generate 50-100 qualified leads.
Deliverables: 1-2 demo ad campaigns + code/setup + 50-100 qualified
    leads + documentation.', 13),
  ('digital-marketing', 'M14. Analytics, Automation & AI Tools', 'Task: Learn Google Analytics, Search Console, and Meta Insights;
    track CTR, CPC, ROAS, ROI on a real or demo campaign; evaluate
    10-15 AI marketing tools for content, SEO, and automation.
Deliverables: analytics report using real metrics (CTR/CPC/ROAS/ROI)
    + evaluation of 10-15 AI marketing tools.', 14),
  ('digital-marketing', 'M15. Sales Funnel & Client Acquisition Practice', 'Task: Build a TOFU/MOFU/BOFU sales funnel for the team, then run 2-3
    mock client marketing-audit meetings to practice pitching it.
Deliverables: funnel built for the team + notes from 2-3 mock client
    marketing-audit meetings.', 15),
  ('digital-marketing', 'M16. Reporting & Case Studies', 'Task: Build weekly/monthly report templates covering traffic, leads,
    and ROI, then study and write up 5-7 real marketing case studies.
Deliverables: report templates + 5-7 real case study write-ups.', 16),
  ('digital-marketing', 'M17. Capstone: Complete Marketing Strategy + Presentation', 'Task: Produce one complete marketing strategy covering brand, SEO,
    content, social, email, paid ads, funnel, KPI dashboard, a 90-day
    roadmap, and budget — then present and defend it.
Deliverables: full strategy doc (brand, SEO, content, social, email,
    paid, funnel, KPI dashboard, 90-day roadmap, budget) + final
    presentation.', 17),
  ('compliance-executive', 'M1. Business Fundamentals Documentation', 'Task: Research and write up what a business/startup is, and the
    differences, pros, cons, and liability of a Sole Proprietorship,
    Partnership, Private Limited Company, LLP, and OPC.
Deliverables: 25-40pg doc, comparison table of entity types,
    presentation.', 1),
  ('compliance-executive', 'M2. Real-World Research: Why Compliance Matters', 'Task: Research 5-7 real cases of businesses penalized or disputed due
    to no registration, missing GST, IP theft, or bad contracts, and
    document what went wrong.
Deliverables: report with 5-7 real case examples.', 2),
  ('compliance-executive', 'M3. Learning Sprint — Beginner (MCA & Startup India Portals)', 'Task: Explore (without submitting) the MCA portal and Startup India
    portal — understand navigation, what each section is for.
Deliverables: 1 walkthrough note/screenshot set per portal +
    documentation summarizing what was learned.', 3),
  ('compliance-executive', 'M4. Learning Sprint — Intermediate (Udyam & GST Portals)', 'Task: Explore the Udyam/MSME registration portal and the GST portal
    — understand navigation and what forms exist.
Deliverables: 1 walkthrough note/screenshot set per portal +
    documentation.', 4),
  ('compliance-executive', 'M5. Learning Sprint — Advanced (IP India Portal)', 'Task: Explore the IP India (trademark/copyright) portal — understand
    navigation and filing categories. No prior mastery assumed — this
    tier is where beginners catch up before real project work begins.
Deliverables: 1 walkthrough note/screenshot set + documentation + a
    self-assessment of strengths/weaknesses.', 5),
  ('compliance-executive', 'M6. Prompt Engineering — Learn & Practice', 'Task: Learn prompt engineering fundamentals (zero-shot, few-shot,
    role prompting, iterative refinement) using ChatGPT/Claude.
    Practice writing prompts for research and drafting tasks.
Deliverables: practice log of 10+ prompts tried + documentation of
    techniques learned.', 6),
  ('compliance-executive', 'M7. Best AI Prompts for Compliance Work', 'Task: Generate and refine prompts for real compliance tasks —
    researching registration requirements, drafting contract/NDA
    clauses, summarizing IT Act/IP provisions. Document the 10-20
    best-performing prompts with the AI''s result for each.
Deliverables: doc of 10-20 best prompts + results, organized by use
    case.', 7),
  ('compliance-executive', 'M8. Company Registration Process', 'Task: Document the step-by-step registration process for a Sole
    Proprietorship, LLP, and Private Limited company — DIN, DSC, name
    approval (RUN/SPICe+), MOA, AOA, and required documents.
Deliverables: step-by-step registration guide for each entity type.', 8),
  ('compliance-executive', 'M9. NIC Codes: What They Are & How to Use Them', 'Task: Research what NIC (National Industrial Classification) codes
    are, why the government requires them, and how they''re used
    during company incorporation, GST registration, and Udyam/MSME
    registration. Practically look up and shortlist the correct NIC
    codes for each of the team''s service lines (web dev, software,
    design, marketing, media).
Deliverables: doc explaining NIC codes + a shortlist of correct NIC
    codes for the company''s services with justification.', 9),
  ('compliance-executive', 'M10. Startup India & MSME/Udyam Registration', 'Task: Document how to register on Startup India (eligibility and
    benefits) and the Udyam/MSME registration process, certificate,
    and benefits.
Deliverables: registration guide + sample certificate walkthrough.', 10),
  ('compliance-executive', 'M11. Taxation & GST Basics', 'Task: Research PAN/TAN, when GST registration becomes mandatory, and
    basic tax obligations for a service business, then apply it to
    the team''s situation.
Deliverables: tax obligation summary doc for the company.', 11),
  ('compliance-executive', 'M12. IT Act, Cyber Law & Data Privacy', 'Task: Research IT Act 2000 basics, data privacy obligations, common
    cyber offenses relevant to a digital agency, and the penalties
    for each.
Deliverables: doc + one-page compliance cheat sheet.', 12),
  ('compliance-executive', 'M13. Copyright, Trademark & IP Basics', 'Task: Research copyright law and trademark registration (IP India),
    then draft how IP ownership should be handled for client
    deliverables (code/design ownership) and what infringement
    penalties look like.
Deliverables: IP basics doc + a draft IP-ownership clause for company
    contracts.', 13),
  ('compliance-executive', 'M14. Contracts & Client Agreement Essentials', 'Task: Study NDAs, service agreements, IP transfer clauses, liability,
    and termination terms, then draft reusable templates for both.
Deliverables: reusable NDA template + service agreement template.', 14),
  ('compliance-executive', 'M15. Statutory Certificates & Compliance Calendar', 'Task: Identify certificates/licenses a digital agency may need (Shop
    & Establishment, GST, MSME, trademark) and their renewal cycles,
    then build a compliance calendar.
Deliverables: certificate checklist + compliance renewal calendar for
    the team.', 15),
  ('compliance-executive', 'M16. Capstone: Company Registration Roadmap', 'Task: Build one real, actionable roadmap: recommended entity type
    with reasoning, correct NIC codes, MSME/Startup India registration
    steps, GST decision, and a trademark plan for the company
    name/logo.
Deliverables: full roadmap document, usable directly by the founder.', 16),
  ('compliance-executive', 'M17. Final Presentation', 'Task: Present business structures, portal walkthroughs, NIC codes,
    IT Act/IP basics, contract templates, and the final registration
    roadmap to the founder.
Deliverables: presentation covering business structures, portals, NIC
    codes, IT Act/IP basics, contracts, and the company registration
    roadmap.', 17)
ON CONFLICT (domain_id, title) DO NOTHING;

-- (Notifications table and RLS already defined above in the main schema section)

-- trigger function for tasks
create or replace function public.notify_on_task_change()
returns trigger as $$
begin
  if tg_op = 'INSERT' then
    insert into public.notifications (user_id, title, message, type, link)
    values (new.assigned_to, 'New Task Assigned', 'You have been assigned a new task: ' || new.title, 'task', '/tasks');
  elsif tg_op = 'UPDATE' and old.status <> new.status then
    insert into public.notifications (user_id, title, message, type, link)
    values (new.assigned_to, 'Task Status Updated', 'Your task "' || new.title || '" status was updated to ' || new.status, 'task', '/tasks');
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_notify_on_task_change on public.tasks;
create trigger trigger_notify_on_task_change
after insert or update on public.tasks
for each row execute function public.notify_on_task_change();

-- trigger function for milestone submissions
create or replace function public.notify_on_milestone_submission_change()
returns trigger as $$
declare
  v_target_admin_id uuid;
  v_admin_name text;
  v_milestone_title text;
begin
  select coalesce(name, email) into v_admin_name from public.admin_profiles where id = NEW.admin_id;
  select title into v_milestone_title from public.milestones where id = NEW.milestone_id;

  if (tg_op = 'INSERT' or (tg_op = 'UPDATE' and old.status <> new.status)) then
    if NEW.status = 'in_progress' then
      for v_target_admin_id in select id from public.admin_profiles where role = 'super_admin' and id <> NEW.admin_id loop
        insert into public.notifications (user_id, title, message, type, link)
        values (
          v_target_admin_id,
          'Milestone Work Started',
          coalesce(v_admin_name, 'A team member') || ' started work on milestone "' || coalesce(v_milestone_title, 'Milestone') || '".',
          'milestone',
          '/milestones'
        );
      end loop;
    elsif NEW.status = 'pending' then
      for v_target_admin_id in select id from public.admin_profiles where role = 'super_admin' and id <> NEW.admin_id loop
        insert into public.notifications (user_id, title, message, type, link)
        values (
          v_target_admin_id,
          'Milestone Report Submitted',
          coalesce(v_admin_name, 'A team member') || ' submitted a report for milestone "' || coalesce(v_milestone_title, 'Milestone') || '".',
          'milestone',
          '/milestones'
        );
      end loop;
    elsif NEW.status = 'approved' then
      insert into public.notifications (user_id, title, message, type, link)
      values (
        NEW.admin_id,
        'Milestone Approved',
        'Your report for milestone "' || coalesce(v_milestone_title, 'Milestone') || '" has been approved!',
        'milestone',
        '/milestones'
      );
    elsif NEW.status = 'rejected' then
      insert into public.notifications (user_id, title, message, type, link)
      values (
        NEW.admin_id,
        'Milestone Revisions Requested',
        'Your report for milestone "' || coalesce(v_milestone_title, 'Milestone') || '" requires revisions.',
        'milestone',
        '/milestones'
      );
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_notify_on_milestone_submission_change on public.milestone_submissions;
create trigger trigger_notify_on_milestone_submission_change
after insert or update on public.milestone_submissions
for each row execute function public.notify_on_milestone_submission_change();

-- trigger function for doubts
create or replace function public.notify_on_doubt_change()
returns trigger as $$
declare
  v_super_admin_id uuid;
begin
  if tg_op = 'INSERT' then
    for v_super_admin_id in select id from public.admin_profiles where role = 'super_admin' loop
      insert into public.notifications (user_id, title, message, type, link)
      values (v_super_admin_id, 'New Doubt Raised', 'A teammate has raised a doubt on a training milestone.', 'doubt', '/doubts');
    end loop;
  elsif tg_op = 'UPDATE' and old.resolved <> new.resolved and new.resolved = true then
    insert into public.notifications (user_id, title, message, type, link)
    values (new.admin_id, 'Doubt Resolved', 'Your doubt has been marked as resolved.', 'doubt', '/doubts');
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_notify_on_doubt_change on public.milestone_doubts;
create trigger trigger_notify_on_doubt_change
after insert or update on public.milestone_doubts
for each row execute function public.notify_on_doubt_change();

-- trigger function for daily reports
create or replace function public.notify_on_daily_report_insert()
returns trigger as $$
declare
  v_super_admin_id uuid;
  v_member_name text;
begin
  select name into v_member_name from public.admin_profiles where id = new.member_id;
  if v_member_name is null then
    v_member_name := 'A teammate';
  end if;

  for v_super_admin_id in select id from public.admin_profiles where role = 'super_admin' loop
    insert into public.notifications (user_id, title, message, type, link)
    values (v_super_admin_id, 'Daily Report Filed', v_member_name || ' filed a daily report for ' || new.report_date, 'report', '/reports');
  end loop;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_notify_on_daily_report_insert on public.daily_reports;
create trigger trigger_notify_on_daily_report_insert
after insert on public.daily_reports
for each row execute function public.notify_on_daily_report_insert();

-- ==========================================
-- Contact Inquiries Table & RLS Policies
-- ==========================================
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  service text,
  budget text,
  message text not null,
  status text not null default 'new', -- 'new', 'contacted', 'in_progress', 'closed'
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.contact_inquiries enable row level security;

-- Public insert policy (allow any visitor on user-website to submit inquiries)
drop policy if exists "Allow public insert for contact_inquiries" on public.contact_inquiries;
create policy "Allow public insert for contact_inquiries" on public.contact_inquiries
  for insert with check (true);

-- Admin select/update/delete policy
drop policy if exists "Allow authorized admins full access to contact_inquiries" on public.contact_inquiries;
create policy "Allow authorized admins full access to contact_inquiries" on public.contact_inquiries
  for all using (public.has_permission('view_contact_inquiries') or public.is_super_admin());


-- ==========================================
-- Consultation Bookings Table & RLS Policies
-- ==========================================
create table if not exists public.consultation_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  service text,
  budget text,
  timeline text,
  description text,
  date text,
  time text,
  notes text,
  status text not null default 'new', -- 'new', 'confirmed', 'completed', 'cancelled'
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.consultation_bookings enable row level security;

-- Public insert policy (allow any visitor on user-website to book consultations)
drop policy if exists "Allow public insert for consultation_bookings" on public.consultation_bookings;
create policy "Allow public insert for consultation_bookings" on public.consultation_bookings
  for insert with check (true);

-- Admin select/update/delete policy
drop policy if exists "Allow authorized admins full access to consultation_bookings" on public.consultation_bookings;
create policy "Allow authorized admins full access to consultation_bookings" on public.consultation_bookings
  for all using (public.has_permission('view_consultations') or public.is_super_admin());


-- ==========================================
-- Triggers to notify super admins on new submissions
-- ==========================================
create or replace function public.notify_on_contact_inquiry_insert()
returns trigger as $$
declare
  v_admin_id uuid;
begin
  for v_admin_id in select id from public.admin_profiles where role = 'super_admin' or 'view_contact_inquiries' = any(permissions) loop
    insert into public.notifications (user_id, title, message, type, link)
    values (v_admin_id, 'New Contact Inquiry', 'New inquiry from ' || new.first_name || ' ' || new.last_name || ' (' || new.email || ')', 'general', '/contact-inquiries');
  end loop;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_notify_on_contact_inquiry_insert on public.contact_inquiries;
create trigger trigger_notify_on_contact_inquiry_insert
after insert on public.contact_inquiries
for each row execute function public.notify_on_contact_inquiry_insert();


create or replace function public.notify_on_consultation_booking_insert()
returns trigger as $$
declare
  v_admin_id uuid;
begin
  for v_admin_id in select id from public.admin_profiles where role = 'super_admin' or 'view_consultations' = any(permissions) loop
    insert into public.notifications (user_id, title, message, type, link)
    values (v_admin_id, 'New Free Consultation Request', 'New consultation booking from ' || new.name || ' (' || new.email || ')', 'general', '/consultations');
  end loop;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trigger_notify_on_consultation_booking_insert on public.consultation_bookings;
create trigger trigger_notify_on_consultation_booking_insert
after insert on public.consultation_bookings
for each row execute function public.notify_on_consultation_booking_insert();


-- ==========================================
-- Supabase Storage Buckets & Storage RLS Policies (CONSOLIDATED)
-- ==========================================

-- 1. Initialize Storage Buckets 'team-vault' (Private, 50MB) & 'images' (Public, 50MB)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values 
  ('team-vault', 'team-vault', false, 52428800, null),
  ('images', 'images', true, 52428800, array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- SECURITY: Drop all old or existing storage policies first to ensure clean idempotent execution
drop policy if exists "Allow authenticated full access on team-vault" on storage.objects;
drop policy if exists "Allow super_admins full access to team-vault" on storage.objects;
drop policy if exists "Allow admins to upload to team-vault" on storage.objects;
drop policy if exists "Allow admins to update own files in team-vault" on storage.objects;
drop policy if exists "Allow public read access to profiles in team-vault" on storage.objects;
drop policy if exists "Allow public read access on team-vault" on storage.objects;
drop policy if exists "Allow authenticated read on team-vault" on storage.objects;
drop policy if exists "Allow anon insert on team-vault" on storage.objects;
drop policy if exists "Allow anon update on team-vault" on storage.objects;

drop policy if exists "Allow authenticated full access on images" on storage.objects;
drop policy if exists "Allow content editors to write images" on storage.objects;
drop policy if exists "Allow content editors to update images" on storage.objects;
drop policy if exists "Allow super_admins to delete images" on storage.objects;
drop policy if exists "Allow public read access on images" on storage.objects;
drop policy if exists "Allow anon insert on images" on storage.objects;
drop policy if exists "Allow anon update on images" on storage.objects;

-- 2. Storage RLS Policies for 'team-vault' Bucket (ADMIN-SCOPED)
-- Super admins: full read/write/delete access
create policy "Allow super_admins full access to team-vault" on storage.objects
  for all using (bucket_id = 'team-vault' and public.is_super_admin())
  with check (bucket_id = 'team-vault' and public.is_super_admin());

-- Regular admins: can upload and update their own files (profiles/, resumes/, documents/)
create policy "Allow admins to upload to team-vault" on storage.objects
  for insert with check (bucket_id = 'team-vault' and public.is_admin());

create policy "Allow admins to update own files in team-vault" on storage.objects
  for update using (bucket_id = 'team-vault' and public.is_admin())
  with check (bucket_id = 'team-vault' and public.is_admin());

-- Public read: only profiles/ folder (for website team display)
create policy "Allow public read access to profiles in team-vault" on storage.objects
  for select using (bucket_id = 'team-vault' and name like 'profiles/%');

-- Authenticated read: all files in team-vault (team members can view shared docs)
create policy "Allow authenticated read on team-vault" on storage.objects
  for select using (bucket_id = 'team-vault' and auth.role() = 'authenticated');

-- 3. Storage RLS Policies for 'images' Bucket (CONTENT-EDITOR-SCOPED)
-- Content editors with site editing permissions: full write access
create policy "Allow content editors to write images" on storage.objects
  for insert with check (bucket_id = 'images' and public.is_admin());

create policy "Allow content editors to update images" on storage.objects
  for update using (bucket_id = 'images' and public.is_admin())
  with check (bucket_id = 'images' and public.is_admin());

create policy "Allow super_admins to delete images" on storage.objects
  for delete using (bucket_id = 'images' and public.is_super_admin());

-- Public read: images bucket is PUBLIC (anyone can load image URLs).
-- RLS SELECT policy is used for API list() operations in admin media pickers.
drop policy if exists "Allow public read access on images" on storage.objects;
drop policy if exists "Allow authenticated admins to list images" on storage.objects;
create policy "Allow authenticated admins to list images" on storage.objects
  for select using (bucket_id = 'images' and public.is_admin());

-- ==========================================
-- M14: Rate-Limiting Triggers for Public Form Submissions
-- ==========================================
create or replace function public.check_contact_rate_limit()
returns trigger as $$
begin
  if (select count(*) from public.contact_inquiries
      where email = NEW.email
      and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'Rate limit exceeded. Maximum 5 submissions per hour per email address.';
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

create or replace function public.check_consultation_rate_limit()
returns trigger as $$
begin
  if (select count(*) from public.consultation_bookings
      where email = NEW.email
      and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'Rate limit exceeded. Maximum 5 booking requests per hour per email address.';
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists enforce_contact_rate_limit on public.contact_inquiries;
create trigger enforce_contact_rate_limit
  before insert on public.contact_inquiries
  for each row execute function public.check_contact_rate_limit();

drop trigger if exists enforce_consultation_rate_limit on public.consultation_bookings;
create trigger enforce_consultation_rate_limit
  before insert on public.consultation_bookings
  for each row execute function public.check_consultation_rate_limit();

-- ==========================================
-- Auto updated_at triggers for contact/consultation tables
-- ==========================================
drop trigger if exists set_updated_at on contact_inquiries;
create trigger set_updated_at before update on contact_inquiries
  for each row execute function public.update_updated_at_column();

drop trigger if exists set_updated_at on consultation_bookings;
create trigger set_updated_at before update on consultation_bookings
  for each row execute function public.update_updated_at_column();

