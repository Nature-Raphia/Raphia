import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'public-anon-key';

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
});

export const testSupabaseConnection = async () => {
  try {
    const { data, error, status } = await supabase.from('products').select('id').limit(1);

    if (error) {
      console.error('Supabase connection failed:', error.message);
      return false;
    }

    console.log('Supabase connection OK', { status, count: data?.length ?? 0 });
    return true;
  } catch (error) {
    console.error('Supabase test error:', error);
    return false;
  }
};