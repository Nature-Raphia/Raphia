import { supabase } from '../utils/supabase';
import type { Product } from '../types';

const normalizeProduct = (row: any): Product => ({
  id: row.id,
  name: {
    fr: row.name_fr ?? row.name?.fr ?? '',
    en: row.name_en ?? row.name?.en ?? '',
  },
  category: row.category ?? '',
  price: Number(row.price ?? 0),
  description: {
    fr: row.description_fr ?? row.description?.fr ?? '',
    en: row.description_en ?? row.description?.en ?? '',
  },
  image: row.image ?? '',
  materials: {
    fr: row.materials_fr ?? row.materials?.fr ?? '',
    en: row.materials_en ?? row.materials?.en ?? '',
  },
  inStock: row.in_stock ?? row.inStock ?? true,
  featured: row.featured ?? false,
  badge: row.badge_fr || row.badge_en
    ? {
        fr: row.badge_fr ?? '',
        en: row.badge_en ?? '',
      }
    : undefined,
});

const mapProductToDb = (product: Partial<Product>) => ({
  name_fr: product.name?.fr ?? '',
  name_en: product.name?.en ?? '',
  description_fr: product.description?.fr ?? '',
  description_en: product.description?.en ?? '',
  materials_fr: product.materials?.fr ?? '',
  materials_en: product.materials?.en ?? '',
  price: product.price ?? 0,
  image: product.image ?? '',
  category: product.category ?? '',
  in_stock: product.inStock ?? true,
  featured: product.featured ?? false,
});

export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('getAllProducts error:', error);
    return [];
  }

  return (data ?? []).map(normalizeProduct);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from('products').select('*').eq('featured', true);

  if (error) {
    console.error('getFeaturedProducts error:', error);
    return [];
  }

  return (data ?? []).map(normalizeProduct);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();

  if (error) {
    console.error('getProductById error:', error);
    return null;
  }

  return normalizeProduct(data);
};

export const createProduct = async (product: Partial<Product>) => {
  const payload = mapProductToDb(product);
  const { data, error } = await supabase.from('products').insert(payload).select().single();

  if (error) {
    console.error('createProduct error:', error);
    if (error.status === 401) {
      console.error('Supabase 401: verify the RLS policies for public insert on public.products and the anon key permissions.');
    }
    return null;
  }

  return normalizeProduct(data);
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const payload = mapProductToDb(product);
  const { data, error } = await supabase.from('products').update(payload).eq('id', id).select().single();

  if (error) {
    console.error('updateProduct error:', error);
    return null;
  }

  return normalizeProduct(data);
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('deleteProduct error:', error);
    return false;
  }

  return true;
};

export const uploadProductImage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from('produit-image').upload(fileName, file, {
    upsert: true,
    contentType: file.type,
  });

  if (error) {
    console.error('uploadProductImage error:', error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from('produit-image').getPublicUrl(data.path);
  return publicUrlData.publicUrl;
};