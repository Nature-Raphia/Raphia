import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, Product, QuoteRequest } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  isQuoteOpen: boolean;
  setIsQuoteOpen: (v: boolean) => void;
  quotes: QuoteRequest[];
  addQuote: (q: QuoteRequest) => void;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  lastAdded: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Persist quotes in localStorage
const loadQuotes = (): QuoteRequest[] => {
  try {
    const saved = localStorage.getItem('mahalia_quotes');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(loadQuotes);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setLastAdded(product.id);
    setTimeout(() => setLastAdded(null), 2000);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty < 1) { removeItem(productId); return; }
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const addQuote = useCallback((q: QuoteRequest) => {
    setQuotes(prev => {
      const updated = [q, ...prev];
      localStorage.setItem('mahalia_quotes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQuoteStatus = useCallback((id: string, status: QuoteRequest['status']) => {
    setQuotes(prev => {
      const updated = prev.map(q => q.id === id ? { ...q, status } : q);
      localStorage.setItem('mahalia_quotes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      totalItems, totalPrice,
      isCartOpen, setIsCartOpen,
      isQuoteOpen, setIsQuoteOpen,
      quotes, addQuote, updateQuoteStatus,
      lastAdded,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
