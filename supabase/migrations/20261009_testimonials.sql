-- Témoignages « Regards de nos partenaires » de la page d'accueil,
-- gérés depuis l'espace admin (onglet « Témoignages »).
-- À exécuter dans le SQL Editor de Supabase.

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote_fr text not null default '',
  quote_en text not null default '',
  name text not null default '',
  role_fr text not null default '',
  role_en text not null default '',
  -- Nombre d'étoiles affichées (1 à 5)
  rating integer not null default 5 check (rating between 1 and 5),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists testimonials_sort_order_idx
  on public.testimonials (sort_order);

alter table public.testimonials enable row level security;

drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read"
  on public.testimonials for select
  using (true);

-- Écriture via la clé anon, comme les autres tables gérées par l'admin.
drop policy if exists "testimonials_anon_write" on public.testimonials;
create policy "testimonials_anon_write"
  on public.testimonials for all
  using (true)
  with check (true);

-- Reprise des 4 témoignages actuellement codés en dur dans le site.
insert into public.testimonials (quote_fr, quote_en, name, role_fr, role_en, rating, sort_order)
select * from (values
  ('Une qualité de tissage rare et des finitions qui subliment chaque saison de notre concept-store.',
   'Rare weaving quality and finishes that elevate every season in our concept store.',
   'Camille R.', 'Concept-store, Paris', 'Concept store, Paris', 5, 1),
  ('Nature Raphia est devenu un partenaire essentiel de notre sélection été. L''authenticité se ressent dès la première pièce.',
   'Nature Raphia has become an essential partner for our summer selection. You feel the authenticity from the very first piece.',
   'Sofia L.', 'Boutique d''hôtel, Milan', 'Hotel boutique, Milan', 5, 2),
  ('Chaque commande arrive impeccable. Nos clientes tombent amoureuses des chapeaux dès qu''elles les touchent.',
   'Every order arrives in perfect condition. Our customers fall in love with the hats as soon as they touch them.',
   'Elena M.', 'E-shop mode, Barcelone', 'Fashion e-shop, Barcelona', 5, 3),
  ('Un travail éthique et une histoire humaine forte — exactement ce que nos clients recherchent aujourd''hui.',
   'Ethical work and a strong human story — exactly what our customers are looking for today.',
   'Marc D.', 'Boutique déco, Bruxelles', 'Home decor shop, Brussels', 5, 4)
) as seed
where not exists (select 1 from public.testimonials);
