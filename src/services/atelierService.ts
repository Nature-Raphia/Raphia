import { supabase } from '../utils/supabase';
import type { AtelierStep } from '../types';

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
