import { supabase } from '../utils/supabase';
import type { RseCommitment, RseWomenSection } from '../types';

const normalizeCommitment = (row: any): RseCommitment => ({
  id: row.id,
  icon: row.icon ?? 'leaf',
  color: row.color ?? '#2E4033',
  title: {
    fr: row.title_fr ?? '',
    en: row.title_en ?? row.title_fr ?? '',
  },
  description: {
    fr: row.description_fr ?? '',
    en: row.description_en ?? row.description_fr ?? '',
  },
  sortOrder: Number(row.sort_order ?? 0),
});

const mapCommitmentToDb = (commitment: Partial<RseCommitment>) => ({
  icon: commitment.icon ?? 'leaf',
  color: commitment.color ?? '#2E4033',
  title_fr: commitment.title?.fr ?? '',
  title_en: commitment.title?.en ?? '',
  description_fr: commitment.description?.fr ?? '',
  description_en: commitment.description?.en ?? '',
  sort_order: commitment.sortOrder ?? 0,
});

export const getRseCommitments = async (): Promise<RseCommitment[]> => {
  // created_at départage les engagements qui portent le même ordre d'affichage
  const { data, error } = await supabase
    .from('rse_commitments')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getRseCommitments error:', error);
    return [];
  }

  return (data ?? []).map(normalizeCommitment);
};

export const createRseCommitment = async (commitment: Partial<RseCommitment>) => {
  const payload = mapCommitmentToDb(commitment);
  const { data, error } = await supabase.from('rse_commitments').insert(payload).select().single();

  if (error) {
    console.error('createRseCommitment error:', error);
    return null;
  }

  return normalizeCommitment(data);
};

export const updateRseCommitment = async (id: string, commitment: Partial<RseCommitment>) => {
  const payload = mapCommitmentToDb(commitment);
  const { data, error } = await supabase.from('rse_commitments').update(payload).eq('id', id).select().single();

  if (error) {
    console.error('updateRseCommitment error:', error);
    return null;
  }

  return normalizeCommitment(data);
};

export const deleteRseCommitment = async (id: string) => {
  const { error } = await supabase.from('rse_commitments').delete().eq('id', id);

  if (error) {
    console.error('deleteRseCommitment error:', error);
    return false;
  }

  return true;
};

// Bloc « L'autonomisation des femmes artisanes » : une seule ligne (id = 1)

const normalizeWomenSection = (row: any): RseWomenSection => ({
  title: { fr: row.title_fr ?? '', en: row.title_en || row.title_fr || '' },
  description: { fr: row.description_fr ?? '', en: row.description_en || row.description_fr || '' },
  images: {
    main: row.image_main ?? '',
    top: row.image_top ?? '',
    bottom: row.image_bottom ?? '',
  },
  badgeTitle: { fr: row.badge_title_fr ?? '', en: row.badge_title_en || row.badge_title_fr || '' },
  badgeSubtitle: { fr: row.badge_subtitle_fr ?? '', en: row.badge_subtitle_en || row.badge_subtitle_fr || '' },
  stats: Array.isArray(row.stats)
    ? row.stats.map((s: any) => ({
        num: s?.num ?? '',
        icon: s?.icon ?? 'leaf',
        label: { fr: s?.label_fr ?? '', en: s?.label_en || s?.label_fr || '' },
      }))
    : [],
});

const mapWomenSectionToDb = (section: RseWomenSection) => ({
  id: 1,
  title_fr: section.title.fr,
  title_en: section.title.en,
  description_fr: section.description.fr,
  description_en: section.description.en,
  image_main: section.images.main,
  image_top: section.images.top,
  image_bottom: section.images.bottom,
  badge_title_fr: section.badgeTitle.fr,
  badge_title_en: section.badgeTitle.en,
  badge_subtitle_fr: section.badgeSubtitle.fr,
  badge_subtitle_en: section.badgeSubtitle.en,
  stats: section.stats.map(s => ({ num: s.num, icon: s.icon, label_fr: s.label.fr, label_en: s.label.en })),
  updated_at: new Date().toISOString(),
});

export const getRseWomenSection = async (): Promise<RseWomenSection | null> => {
  const { data, error } = await supabase.from('rse_women_section').select('*').eq('id', 1).maybeSingle();

  if (error) {
    console.error('getRseWomenSection error:', error);
    return null;
  }

  return data ? normalizeWomenSection(data) : null;
};

export const saveRseWomenSection = async (section: RseWomenSection) => {
  const { data, error } = await supabase
    .from('rse_women_section')
    .upsert(mapWomenSectionToDb(section))
    .select()
    .single();

  if (error) {
    console.error('saveRseWomenSection error:', error);
    return null;
  }

  return normalizeWomenSection(data);
};

export const uploadRseImage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from('rse-image').upload(fileName, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    console.error('uploadRseImage error:', error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from('rse-image').getPublicUrl(data.path);
  return publicUrlData.publicUrl;
};
