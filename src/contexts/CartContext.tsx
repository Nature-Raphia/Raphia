import React, { createContext, useContext, useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { CartItem, Product, QuoteRequest } from '../types';
import { contactEmailService } from '../services/contactEmailService';
import { whatsappService } from '../services/whatsappService';

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
  addQuote: (q: Omit<QuoteRequest, 'id' | 'createdAt' | 'updatedAt'>) => Promise<QuoteRequest>;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  lastAdded: string | null;
  isSendingEmail: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const WHATSAPP_QUOTE_NUMBER = '261347640116';

// Persist quotes in localStorage
const loadQuotes = (): QuoteRequest[] => {
  try {
    const saved = localStorage.getItem('mahalia_quotes');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

// Générer un ID unique
const generateId = (): string => {
  return `Q-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
};

// Initialiser EmailJS
if (import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
} else {
  console.warn('⚠️ VITE_EMAILJS_PUBLIC_KEY manquante dans .env');
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(loadQuotes);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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
    if (qty < 1) {
      removeItem(productId);
      return;
    }
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  // Vérifier si EmailJS est configuré
  const isEmailConfigured = (): boolean => {
    return !!(import.meta.env.VITE_EMAILJS_SERVICE_ID && 
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID && 
              import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  };

  const formatWhatsAppQuoteMessage = useCallback((quote: QuoteRequest) => {
    const items = quote.items.map(item => `${item.product.name.fr} x${item.quantity}`).join(', ');
    const total = (quote.totalEstimate || 0).toLocaleString();

    return `NOUVELLE DEMANDE DE DEVIS - Nature Raphia

Nom : ${quote.customer.name}
Email : ${quote.customer.email}
Téléphone : ${quote.customer.phone || 'Non renseigné'}
Pays : ${quote.customer.country || 'Non renseigné'}
Profil : ${quote.customer.profile === 'grossiste' ? 'Grossiste / B2B' : 'Particulier'}
Message : ${quote.customer.message || 'Aucun message'}

Produits : ${items || 'Aucun article'}

Total estimé : ${total} Ar`;
  }, []);

  const openWhatsAppDirect = useCallback(async (phone: string, message: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    await whatsappService.sendMessage({
      to: cleanPhone,
      message,
    });
  }, []);

  // Fonction pour envoyer l'email au client UNIQUEMENT
  const sendClientEmail = useCallback(async (quote: QuoteRequest) => {
    try {
      setIsSendingEmail(true);

      // Vérifier la configuration EmailJS
      if (!isEmailConfigured()) {
        console.error('❌ EmailJS non configuré');
        throw new Error('Service d\'email non configuré');
      }

      // Vérifier que l'email du client existe
      if (!quote.customer.email) {
        console.error('❌ Email du client manquant');
        throw new Error('Email du client manquant');
      }

      // Construire la liste des articles
      const itemsHtml = quote.items.map(item => 
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #E6DFD3;">${item.product.name.fr}</td>
          <td style="padding: 8px; text-align: center; border-bottom: 1px solid #E6DFD3;">${item.quantity}</td>
          <td style="padding: 8px; text-align: right; border-bottom: 1px solid #E6DFD3;">${(item.product.price).toLocaleString()} Ar</td>
          <td style="padding: 8px; text-align: right; border-bottom: 1px solid #E6DFD3;">${(item.product.price * item.quantity).toLocaleString()} Ar</td>
        </tr>`
      ).join('');

      const itemsText = quote.items.map(item => 
        `- ${item.product.name.fr} x${item.quantity} : ${(item.product.price * item.quantity).toLocaleString()} Ar`
      ).join('\n');

      // Préparer les paramètres - LE DESTINATAIRE EST LE CLIENT
      const templateParams = {
        // ⚠️ IMPORTANT: to_email DOIT être l'email du client
        to_email: quote.customer.email,    // ← C'EST ICI QUE LE DESTINATAIRE EST DÉFINI
        to_name: quote.customer.name,
        
        // Informations du devis
        quote_id: quote.id,
        quote_date: new Date(quote.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
        
        // Informations client
        customer_name: quote.customer.name,
        customer_email: quote.customer.email,
        customer_phone: quote.customer.phone || 'Non renseigné',
        customer_company: quote.customer.company || 'Non renseigné',
        customer_country: quote.customer.country || 'Non renseigné',
        customer_message: quote.customer.message || 'Aucun message',
        
        // Articles
        items_html: itemsHtml,
        items_text: itemsText,
        
        // Total
        total: (quote.totalEstimate || 0).toLocaleString(),
        
        // Sujet
        subject: `Confirmation de votre demande de devis - ${quote.id}`
      };

      console.log('📧 Envoi de l\'email à:', quote.customer.email);
      console.log('📧 Ce n\'est PAS un email admin');

      // Envoyer l'email au client
      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Email envoyé avec succès à', quote.customer.email);

      await contactEmailService.sendContactEmail({
        name: quote.customer.name,
        email: quote.customer.email,
        phone: quote.customer.phone || '',
        subject: `Nouvelle demande de devis - ${quote.id}`,
        message: `Nouvelle demande de devis Nature Raphia\n\nClient: ${quote.customer.name}\nEmail: ${quote.customer.email}\nTéléphone: ${quote.customer.phone || 'Non renseigné'}\nPays: ${quote.customer.country || 'Non renseigné'}\nProfil: ${quote.customer.profile === 'grossiste' ? 'Grossiste / B2B' : 'Particulier'}\n\nMessage: ${quote.customer.message || 'Aucun message'}\n\nProduits:\n${quote.items.map(item => `- ${item.product.name.fr} x${item.quantity}`).join('\n')}\n\nTotal estimé: ${(quote.totalEstimate || 0).toLocaleString()} Ar`,
        type: 'contact'
      });

      return true;

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    } finally {
      setIsSendingEmail(false);
    }
  }, []);

  // Fonction pour ajouter un devis
  const addQuote = useCallback(async (quoteData: Omit<QuoteRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setIsSendingEmail(true);

      // Créer le devis
      const newQuote: QuoteRequest = {
        ...quoteData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'nouveau'
      };

      // Sauvegarder dans localStorage
      setQuotes(prev => {
        const updated = [newQuote, ...prev];
        localStorage.setItem('mahalia_quotes', JSON.stringify(updated));
        return updated;
      });

      // Envoyer l'email au client et une notification admin
      try {
        await sendClientEmail(newQuote);
      } catch (emailError) {
        console.error('❌ Échec de l’envoi par email:', emailError);
      }

      // Envoyer la demande sur WhatsApp via l’API
      try {
        await openWhatsAppDirect(WHATSAPP_QUOTE_NUMBER, formatWhatsAppQuoteMessage(newQuote));
      } catch (whatsappError) {
        console.error('❌ Échec de l’envoi WhatsApp:', whatsappError);
      }

      console.log('✅ Devis créé avec succès:', newQuote.id);
      return newQuote;

    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout du devis:', error);
      throw error;
    } finally {
      setIsSendingEmail(false);
    }
  }, [sendClientEmail]);

  const updateQuoteStatus = useCallback((id: string, status: QuoteRequest['status']) => {
    setQuotes(prev => {
      const updated = prev.map(q => q.id === id ? { ...q, status } : q);
      localStorage.setItem('mahalia_quotes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isCartOpen,
      setIsCartOpen,
      isQuoteOpen,
      setIsQuoteOpen,
      quotes,
      addQuote,
      updateQuoteStatus,
      lastAdded,
      isSendingEmail,
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