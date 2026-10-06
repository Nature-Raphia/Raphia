-- Étapes de l'atelier, gérées depuis l'espace admin (onglet « Atelier »).
-- À exécuter dans le SQL Editor de Supabase.

create table if not exists public.atelier_steps (
  id uuid primary key default gen_random_uuid(),
  image text not null default '',
  title_fr text not null default '',
  title_en text not null default '',
  description_fr text not null default '',
  description_en text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists atelier_steps_sort_order_idx
  on public.atelier_steps (sort_order);

alter table public.atelier_steps enable row level security;

-- Lecture ouverte : la page L'Atelier est publique.
drop policy if exists "atelier_steps_public_read" on public.atelier_steps;
create policy "atelier_steps_public_read"
  on public.atelier_steps for select
  using (true);

-- Écriture via la clé anon, comme la table products : l'espace admin est
-- protégé côté interface uniquement. À restreindre à un rôle authentifié
-- le jour où l'admin passe par Supabase Auth.
drop policy if exists "atelier_steps_anon_write" on public.atelier_steps;
create policy "atelier_steps_anon_write"
  on public.atelier_steps for all
  using (true)
  with check (true);

-- Bucket des photos de l'atelier (upload depuis l'admin).
insert into storage.buckets (id, name, public)
values ('atelier-image', 'atelier-image', true)
on conflict (id) do nothing;

drop policy if exists "atelier_image_public_read" on storage.objects;
create policy "atelier_image_public_read"
  on storage.objects for select
  using (bucket_id = 'atelier-image');

drop policy if exists "atelier_image_anon_write" on storage.objects;
create policy "atelier_image_anon_write"
  on storage.objects for all
  using (bucket_id = 'atelier-image')
  with check (bucket_id = 'atelier-image');

-- Reprise des 4 étapes actuellement codées en dur dans le site,
-- pour qu'elles deviennent modifiables depuis l'admin.
insert into public.atelier_steps (image, title_fr, title_en, description_fr, description_en, sort_order)
select * from (values
  ('/1.jpeg', 'Récolte Côtière', 'Coastal Harvest',
   'Le raphia est récolté à la main sur les palmiers côtiers de Madagascar sans abattre l''arbre, préservant ainsi l''écosystème local.',
   'Raphia is hand-harvested from Madagascar''s coastal palm trees without felling them, preserving the local ecosystem.', 1),
  ('/2.jpeg', 'Peignage & Tri', 'Combing & Sorting',
   'Les fibres sont méticuleusement peignées et triées par longueur et qualité, seules les meilleures fibres rejoignent l''atelier.',
   'Fibres are meticulously combed and sorted by length and quality, only the finest fibres reach the workshop.', 2),
  ('/3.jpeg', 'Teinture Végétale', 'Plant Dyeing',
   'Les teintures sont extraites de plantes locales : indigo, henné, écorces. Zéro produit chimique, 100% biodégradable.',
   'Dyes are extracted from local plants: indigo, henna, tree bark. Zero chemicals, 100% biodegradable.', 3),
  ('/4.jpeg', 'Crochetage d''Art', 'Artisan Crocheting',
   'Chaque pièce est crochetée à la main par nos artisanes. Un sac de taille moyenne représente entre 15 et 25 heures de travail.',
   'Each piece is hand-crocheted by our artisans. A medium-sized bag represents 15 to 25 hours of work.', 4)
) as seed
where not exists (select 1 from public.atelier_steps);
