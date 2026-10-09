-- En-tête de la page L'Atelier (surtitre, titre, introduction affichés
-- au-dessus des étapes), géré depuis l'espace admin (onglet « Atelier »).
-- À exécuter dans le SQL Editor de Supabase.

-- Une seule ligne (id = 1) : cet en-tête est unique sur le site.
create table if not exists public.atelier_page_header (
  id integer primary key default 1 check (id = 1),
  eyebrow_fr text not null default '',
  eyebrow_en text not null default '',
  title_fr text not null default '',
  title_en text not null default '',
  intro_fr text not null default '',
  intro_en text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.atelier_page_header enable row level security;

drop policy if exists "atelier_page_header_public_read" on public.atelier_page_header;
create policy "atelier_page_header_public_read"
  on public.atelier_page_header for select
  using (true);

-- Écriture via la clé anon, comme les autres tables gérées par l'admin.
drop policy if exists "atelier_page_header_anon_write" on public.atelier_page_header;
create policy "atelier_page_header_anon_write"
  on public.atelier_page_header for all
  using (true)
  with check (true);

-- Reprise du contenu actuellement codé en dur dans le site.
insert into public.atelier_page_header (id, eyebrow_fr, eyebrow_en, title_fr, title_en, intro_fr, intro_en)
values (
  1,
  'L''Atelier', 'The Workshop',
  'Un savoir-faire tissé à la main.', 'Handcrafted expertise.',
  'Depuis douze ans, nos artisanes transforment le raphia sauvage en pièces d''exception. Chaque geste — récolte, teinture végétale, crochet — porte la mémoire des hautes terres malgaches.',
  'For twelve years, our artisans have transformed wild raphia into exceptional pieces. Each gesture — harvest, plant dyeing, crochet — carries the memory of the Malagasy highlands.'
)
on conflict (id) do nothing;
