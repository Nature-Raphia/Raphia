-- Engagements RSE (section « Nos Engagements »), gérés depuis l'espace admin
-- (onglet « Engagements »). À exécuter dans le SQL Editor de Supabase.

create table if not exists public.rse_commitments (
  id uuid primary key default gen_random_uuid(),
  -- Nom d'une icône lucide parmi celles proposées dans l'admin (leaf, hand, heart…)
  icon text not null default 'leaf',
  -- Couleur d'accent de la carte (vert olive ou terracotta)
  color text not null default '#2E4033',
  title_fr text not null default '',
  title_en text not null default '',
  description_fr text not null default '',
  description_en text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists rse_commitments_sort_order_idx
  on public.rse_commitments (sort_order);

alter table public.rse_commitments enable row level security;

-- Lecture ouverte : la section Engagements est publique.
drop policy if exists "rse_commitments_public_read" on public.rse_commitments;
create policy "rse_commitments_public_read"
  on public.rse_commitments for select
  using (true);

-- Écriture via la clé anon, comme atelier_steps et products : l'espace admin
-- est protégé côté interface uniquement. À restreindre à un rôle authentifié
-- le jour où l'admin passe par Supabase Auth.
drop policy if exists "rse_commitments_anon_write" on public.rse_commitments;
create policy "rse_commitments_anon_write"
  on public.rse_commitments for all
  using (true)
  with check (true);

-- Reprise des 4 engagements actuellement codés en dur dans le site,
-- pour qu'ils deviennent modifiables depuis l'admin.
insert into public.rse_commitments (icon, color, title_fr, title_en, description_fr, description_en, sort_order)
select * from (values
  ('leaf', '#2E4033', '100% Raphia Naturel', '100% Natural Raphia',
   'Fibre végétale récoltée sans abattre le palmier, préservant l''écosystème côtier de Madagascar.',
   'Plant fibre harvested without felling the palm tree, preserving Madagascar''s coastal ecosystem.', 1),
  ('hand', '#C97A53', 'Fait main à Antsirabe', 'Handmade in Antsirabe',
   'Chaque pièce est tressée à la main dans notre atelier par des artisanes locales expertes.',
   'Each piece is hand-woven in our workshop by expert local artisans.', 2),
  ('heart', '#2E4033', 'Commerce Équitable', 'Fair Trade',
   '40+ femmes artisanes rémunérées justement, avec accès à la formation et à la protection sociale.',
   '40+ female artisans fairly compensated, with access to training and social protection.', 3),
  ('droplets', '#C97A53', 'Zéro Déchet Chimique', 'Zero Chemical Waste',
   'Teintures 100% végétales, eaux de teinture retraitées, emballages recyclables.',
   '100% plant-based dyes, reprocessed dye water, recyclable packaging.', 4)
) as seed
where not exists (select 1 from public.rse_commitments);
