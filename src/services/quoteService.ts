import { supabase } from '../utils/supabase';
import type { QuoteRequest } from '../types';

export const quoteService = {
  async submit(quote: QuoteRequest) {
    const { data, error } = await supabase
      .from('quotes')
      .insert({
        quote_number: `Q-${Date.now()}`,
        status: 'pending',
        client_name: quote.customer.name,
        client_email: quote.customer.email,
        client_phone: quote.customer.phone ?? '',
        client_company: quote.customer.profile === 'grossiste' ? 'Grossiste' : '',
        message: quote.customer.message ?? '',
        items: quote.items,
        total: quote.totalEstimate ?? 0,
        delivery_country: quote.customer.country,
      })
      .select()
      .single();

    if (error) {
      console.error('quoteService.submit error:', error);
      return null;
    }

    return data;
  },
};