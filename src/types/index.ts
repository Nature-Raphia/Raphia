export interface Product {
  id: string;
  name: { fr: string; en: string };
  category: string;
  price: number;
  description: { fr: string; en: string };
  image: string;
  materials: { fr: string; en: string };
  inStock: boolean;
  featured: boolean;
  badge?: { fr: string; en: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    country: string;
    profile: 'particulier' | 'grossiste';
    message?: string;
    phone?: string;
  };
  status: 'nouveau' | 'en_cours' | 'traite' | 'archive';
  createdAt: string;
  totalEstimate?: number;
}

export type Language = 'fr' | 'en';

export interface AdminStats {
  totalQuotes: number;
  newQuotes: number;
  totalProducts: number;
  monthlyRequests: number;
}
