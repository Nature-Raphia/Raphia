-- Bloc « L'autonomisation des femmes artisanes » de la section RSE,
-- géré depuis l'espace admin (onglet « Engagements »).
-- À exécuter dans le SQL Editor de Supabase.

-- Une seule ligne (id = 1) : ce bloc est unique sur le site.
create table if not exists public.rse_women_section (
  id integer primary key default 1 check (id = 1),
  title_fr text not null default '',
  title_en text not null default '',
  description_fr text not null default '',
  description_en text not null default '',
  -- Photos : grande à gauche, petite en haut à droite, petite en bas à droite
  image_main text not null default '',
  image_top text not null default '',
  image_bottom text not null default '',
  badge_title_fr text not null default '',
  badge_title_en text not null default '',
  badge_subtitle_fr text not null default '',
  badge_subtitle_en text not null default '',
  -- Chiffres clés : [{ "num": "40+", "icon": "users", "label_fr": "...", "label_en": "..." }]
  stats jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.rse_women_section enable row level security;

drop policy if exists "rse_women_section_public_read" on public.rse_women_section;
create policy "rse_women_section_public_read"
  on public.rse_women_section for select
  using (true);

-- Écriture via la clé anon, comme les autres tables gérées par l'admin.
drop policy if exists "rse_women_section_anon_write" on public.rse_women_section;
create policy "rse_women_section_anon_write"
  on public.rse_women_section for all
  using (true)
  with check (true);

-- Bucket des photos de la section RSE (upload depuis l'admin).
insert into storage.buckets (id, name, public)
values ('rse-image', 'rse-image', true)
on conflict (id) do nothing;

drop policy if exists "rse_image_public_read" on storage.objects;
create policy "rse_image_public_read"
  on storage.objects for select
  using (bucket_id = 'rse-image');

drop policy if exists "rse_image_anon_write" on storage.objects;
create policy "rse_image_anon_write"
  on storage.objects for all
  using (bucket_id = 'rse-image')
  with check (bucket_id = 'rse-image');

-- Reprise du contenu actuellement codé en dur dans le site.
insert into public.rse_women_section (
  id, title_fr, title_en, description_fr, description_en,
  image_main, image_top, image_bottom,
  badge_title_fr, badge_title_en, badge_subtitle_fr, badge_subtitle_en,
  stats
) values (
  1,
  'L''autonomisation des femmes artisanes',
  'Empowering women artisans',
  'Notre atelier emploie plus de 40 femmes artisanes d''Antsirabe. Au-delà d''un emploi, nous offrons formation, épargne solidaire et accès aux soins — une chaîne de valeur humaine au cœur de notre modèle.',
  'Our workshop employs more than 40 women artisans from Antsirabe. Beyond employment, we offer training, solidarity savings and healthcare access — a human value chain at the heart of our model.',
  '/nature.jpg', '/vegetal.jpg', '/1.jpg',
  'Artisanat d''exception', 'Exceptional craftsmanship',
  'Savoir-faire unique', 'Unique know-how',
  '[
    {"num": "40+", "icon": "users", "label_fr": "Artisanes", "label_en": "Artisans"},
    {"num": "12", "icon": "award", "label_fr": "Ans d''expertise", "label_en": "Years"},
    {"num": "0%", "icon": "leaf", "label_fr": "Chimique", "label_en": "Chemical"}
  ]'::jsonb
)
on conflict (id) do nothing;
