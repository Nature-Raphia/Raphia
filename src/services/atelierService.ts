import { supabase } from '../utils/supabase';
import type { AtelierPageHeader, AtelierStep, HomeAtelierSection } from '../types';

const normalizeStep = (row: any): AtelierStep => ({
  id: row.id,
  image: row.image ?? '',
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

const mapStepToDb = (step: Partial<AtelierStep>) => ({
  image: step.image ?? '',
  title_fr: step.title?.fr ?? '',
  title_en: step.title?.en ?? '',
  description_fr: step.description?.fr ?? '',
  description_en: step.description?.en ?? '',
  sort_order: step.sortOrder ?? 0,
});

export const getAtelierSteps = async (): Promise<AtelierStep[]> => {
  // created_at départage les étapes qui portent le même ordre d'affichage
  const { data, error } = await supabase
    .from('atelier_steps')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getAtelierSteps error:', error);
    return [];
  }

  return (data ?? []).map(normalizeStep);
};

export const createAtelierStep = async (step: Partial<AtelierStep>) => {
  const payload = mapStepToDb(step);
  const { data, error } = await supabase.from('atelier_steps').insert(payload).select().single();

  if (error) {
    console.error('createAtelierStep error:', error);
    return null;
  }

  return normalizeStep(data);
};

export const updateAtelierStep = async (id: string, step: Partial<AtelierStep>) => {
  const payload = mapStepToDb(step);
  const { data, error } = await supabase.from('atelier_steps').update(payload).eq('id', id).select().single();

  if (error) {
    console.error('updateAtelierStep error:', error);
    return null;
  }

  return normalizeStep(data);
};

export const deleteAtelierStep = async (id: string) => {
  const { error } = await supabase.from('atelier_steps').delete().eq('id', id);

  if (error) {
    console.error('deleteAtelierStep error:', error);
    return false;
  }

  return true;
};

export const uploadAtelierImage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from('atelier-image').upload(fileName, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    console.error('uploadAtelierImage error:', error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from('atelier-image').getPublicUrl(data.path);
  return publicUrlData.publicUrl;
};

// Bloc « L'Atelier » de la page d'accueil : une seule ligne (id = 1)

const bilingual = (fr: any, en: any) => ({ fr: fr ?? '', en: en || fr || '' });

const normalizeHomeAtelier = (row: any): HomeAtelierSection => ({
  image: row.image ?? '',
  label: bilingual(row.label_fr, row.label_en),
  title: bilingual(row.title_fr, row.title_en),
  subtitle: bilingual(row.subtitle_fr, row.subtitle_en),
  cta: bilingual(row.cta_fr, row.cta_en),
});

export const getHomeAtelierSection = async (): Promise<HomeAtelierSection | null> => {
  const { data, error } = await supabase.from('home_atelier_section').select('*').eq('id', 1).maybeSingle();

  if (error) {
    console.error('getHomeAtelierSection error:', error);
    return null;
  }

  return data ? normalizeHomeAtelier(data) : null;
};

export const saveHomeAtelierSection = async (section: HomeAtelierSection) => {
  const payload = {
    id: 1,
    image: section.image,
    label_fr: section.label.fr,
    label_en: section.label.en,
    title_fr: section.title.fr,
    title_en: section.title.en,
    subtitle_fr: section.subtitle.fr,
    subtitle_en: section.subtitle.en,
    cta_fr: section.cta.fr,
    cta_en: section.cta.en,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from('home_atelier_section').upsert(payload).select().single();

  if (error) {
    console.error('saveHomeAtelierSection error:', error);
    return null;
  }

  return normalizeHomeAtelier(data);
};

// En-tête de la page L'Atelier (au-dessus des étapes) : une seule ligne (id = 1)

const normalizeAtelierHeader = (row: any): AtelierPageHeader => ({
  eyebrow: bilingual(row.eyebrow_fr, row.eyebrow_en),
  title: bilingual(row.title_fr, row.title_en),
  intro: bilingual(row.intro_fr, row.intro_en),
});

export const getAtelierPageHeader = async (): Promise<AtelierPageHeader | null> => {
  const { data, error } = await supabase.from('atelier_page_header').select('*').eq('id', 1).maybeSingle();

  if (error) {
    console.error('getAtelierPageHeader error:', error);
    return null;
  }

  return data ? normalizeAtelierHeader(data) : null;
};

export const saveAtelierPageHeader = async (header: AtelierPageHeader) => {
  const payload = {
    id: 1,
    eyebrow_fr: header.eyebrow.fr,
    eyebrow_en: header.eyebrow.en,
    title_fr: header.title.fr,
    title_en: header.title.en,
    intro_fr: header.intro.fr,
    intro_en: header.intro.en,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from('atelier_page_header').upsert(payload).select().single();

  if (error) {
    console.error('saveAtelierPageHeader error:', error);
    return null;
  }

  return normalizeAtelierHeader(data);
};
