import { supabase } from '../utils/supabase';
import type { Testimonial } from '../types';

const normalizeTestimonial = (row: any): Testimonial => ({
  id: row.id,
  quote: {
    fr: row.quote_fr ?? '',
    en: row.quote_en || row.quote_fr || '',
  },
  name: row.name ?? '',
  role: {
    fr: row.role_fr ?? '',
    en: row.role_en || row.role_fr || '',
  },
  rating: Number(row.rating ?? 5),
  sortOrder: Number(row.sort_order ?? 0),
});

const mapTestimonialToDb = (testimonial: Partial<Testimonial>) => ({
  quote_fr: testimonial.quote?.fr ?? '',
  quote_en: testimonial.quote?.en ?? '',
  name: testimonial.name ?? '',
  role_fr: testimonial.role?.fr ?? '',
  role_en: testimonial.role?.en ?? '',
  rating: Math.min(5, Math.max(1, testimonial.rating ?? 5)),
  sort_order: testimonial.sortOrder ?? 0,
});

export const getTestimonials = async (): Promise<Testimonial[]> => {
  // created_at départage les témoignages qui portent le même ordre d'affichage
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getTestimonials error:', error);
    return [];
  }

  return (data ?? []).map(normalizeTestimonial);
};

export const createTestimonial = async (testimonial: Partial<Testimonial>) => {
  const { data, error } = await supabase.from('testimonials').insert(mapTestimonialToDb(testimonial)).select().single();

  if (error) {
    console.error('createTestimonial error:', error);
    return null;
  }

  return normalizeTestimonial(data);
};

export const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
  const { data, error } = await supabase.from('testimonials').update(mapTestimonialToDb(testimonial)).eq('id', id).select().single();

  if (error) {
    console.error('updateTestimonial error:', error);
    return null;
  }

  return normalizeTestimonial(data);
};

export const deleteTestimonial = async (id: string) => {
  const { error } = await supabase.from('testimonials').delete().eq('id', id);

  if (error) {
    console.error('deleteTestimonial error:', error);
    return false;
  }

  return true;
};
