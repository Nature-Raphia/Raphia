-- Bloc « L'Atelier » de la page d'accueil (photo, textes, bouton),
-- géré depuis l'espace admin (onglet « Accueil · Atelier »).
-- À exécuter dans le SQL Editor de Supabase, après 20261006_atelier_steps.sql
-- (la photo est envoyée dans le bucket atelier-image créé par ce script).

-- Une seule ligne (id = 1) : ce bloc est unique sur le site.
create table if not exists public.home_atelier_section (
  id integer primary key default 1 check (id = 1),
  -- Vide = photo par défaut du site
  image text not null default '',
  label_fr text not null default '',
  label_en text not null default '',
  title_fr text not null default '',
  title_en text not null default '',
  subtitle_fr text not null default '',
  subtitle_en text not null default '',
  cta_fr text not null default '',
  cta_en text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.home_atelier_section enable row level security;

drop policy if exists "home_atelier_section_public_read" on public.home_atelier_section;
create policy "home_atelier_section_public_read"
  on public.home_atelier_section for select
  using (true);

-- Écriture via la clé anon, comme les autres tables gérées par l'admin.
drop policy if exists "home_atelier_section_anon_write" on public.home_atelier_section;
create policy "home_atelier_section_anon_write"
  on public.home_atelier_section for all
  using (true)
  with check (true);

-- Reprise du contenu actuellement codé en dur dans le site.
insert into public.home_atelier_section (
  id, image, label_fr, label_en, title_fr, title_en, subtitle_fr, subtitle_en, cta_fr, cta_en
) values (
  1,
  '',
  'L''Atelier · Nature Raphia', 'The Workshop · Nature Raphia',
  'Un savoir-faire tissé à la main.', 'Handcrafted expertise.',
  'Depuis douze ans, nos artisanes transforment le raphia sauvage en pièces d''exception. Chaque geste — récolte, teinture végétale, crochet — porte la mémoire des hautes terres malgaches.',
  'For twelve years, our artisans have transformed wild raphia into exceptional pieces. Each gesture — harvest, plant dyeing, crochet — carries the memory of the Malagasy highlands.',
  'Notre Histoire', 'Our Story'
)
on conflict (id) do nothing;
