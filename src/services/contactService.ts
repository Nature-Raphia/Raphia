import { supabase } from './supabase';

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const contactService = {
  // Sauvegarder le contact dans Supabase
  async submit(data: ContactData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('contacts')
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          subject: data.subject,
          message: data.message,
          status: 'new'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du contact:', error);
      return false;
    }
  }
};