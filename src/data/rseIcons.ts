import { Leaf, Hand, Heart, Droplets, Users, Award, Sparkles, Recycle, Sun, Globe, Sprout, HandHeart, type LucideIcon } from 'lucide-react';

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
