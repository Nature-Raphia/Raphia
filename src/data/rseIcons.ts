import { Leaf, Hand, Heart, Droplets, Users, Award, Sparkles, Recycle, Sun, Globe, Sprout, HandHeart, type LucideIcon } from 'lucide-react';
import type { RseWomenSection } from '../types';

// Icônes proposées dans l'admin pour les cartes « Nos Engagements ».
// La clé est la valeur stockée dans rse_commitments.icon.
export const RSE_ICONS: Record<string, { icon: LucideIcon; label: string }> = {
  leaf: { icon: Leaf, label: 'Feuille' },
  hand: { icon: Hand, label: 'Main' },
  heart: { icon: Heart, label: 'Cœur' },
  droplets: { icon: Droplets, label: 'Gouttes' },
  users: { icon: Users, label: 'Communauté' },
  award: { icon: Award, label: 'Récompense' },
  sparkles: { icon: Sparkles, label: 'Étincelles' },
  recycle: { icon: Recycle, label: 'Recyclage' },
  sun: { icon: Sun, label: 'Soleil' },
  globe: { icon: Globe, label: 'Planète' },
  sprout: { icon: Sprout, label: 'Pousse' },
  handHeart: { icon: HandHeart, label: 'Solidarité' },
};

export const getRseIcon = (name: string): LucideIcon => RSE_ICONS[name]?.icon ?? Leaf;

// Couleurs d'accent de la charte
export const RSE_COLORS = [
  { value: '#2E4033', label: 'Vert olive' },
  { value: '#C97A53', label: 'Terracotta' },
];

// Bloc « femmes artisanes » affiché tant que la table rse_women_section est vide,
// et proposé comme point de départ dans l'admin.
export const DEFAULT_RSE_WOMEN_SECTION: RseWomenSection = {
  title: { fr: "L'autonomisation des femmes artisanes", en: 'Empowering women artisans' },
  description: {
    fr: "Notre atelier emploie plus de 40 femmes artisanes d'Antsirabe. Au-delà d'un emploi, nous offrons formation, épargne solidaire et accès aux soins — une chaîne de valeur humaine au cœur de notre modèle.",
    en: 'Our workshop employs more than 40 women artisans from Antsirabe. Beyond employment, we offer training, solidarity savings and healthcare access — a human value chain at the heart of our model.',
  },
  images: { main: '/nature.jpg', top: '/vegetal.jpg', bottom: '/1.jpg' },
  badgeTitle: { fr: "Artisanat d'exception", en: 'Exceptional craftsmanship' },
  badgeSubtitle: { fr: 'Savoir-faire unique', en: 'Unique know-how' },
  stats: [
    { num: '40+', icon: 'users', label: { fr: 'Artisanes', en: 'Artisans' } },
    { num: '12', icon: 'award', label: { fr: "Ans d'expertise", en: 'Years' } },
    { num: '0%', icon: 'leaf', label: { fr: 'Chimique', en: 'Chemical' } },
  ],
};
