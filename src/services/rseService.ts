import { supabase } from '../utils/supabase';
import type { RseCommitment } from '../types';

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
