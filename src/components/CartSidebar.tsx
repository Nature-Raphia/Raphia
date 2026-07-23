import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Send, ArrowRight, CheckCircle } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { QuoteRequest } from '../types';
import { quoteService } from '../services/quoteService';

const QuoteForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const { t, lang } = useLang();
  const { items, totalPrice, clearCart, addQuote } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', profile: 'particulier' as 'particulier' | 'grossiste', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const quote: QuoteRequest = {
      id: `Q-${Date.now()}`,
      items: [...items],
      customer: form,
      status: 'nouveau',
      createdAt: new Date().toISOString(),
      totalEstimate: totalPrice,
    };

    const result = await quoteService.submit(quote);

    if (result) {
      addQuote(quote);
      clearCart();
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="bg-[#E6DFD3]/50 rounded-xl p-3 mb-2">
        <div className="text-xs text-[#2E4033]/60 mb-2 font-medium uppercase tracking-widest">{lang === 'fr' ? 'Récapitulatif' : 'Summary'}</div>
        {items.map(item => (
          <div key={item.product.id} className="flex justify-between text-sm text-[#2E4033] py-1">
            <span>{item.product.name[lang]} × {item.quantity}</span>
            <span className="font-medium">{item.product.price * item.quantity} €</span>
          </div>
        ))}
        <div className="border-t border-[#E6DFD3] mt-2 pt-2 flex justify-between font-semibold text-[#2E4033]">
          <span>{t('cart.total')}</span>
          <span className="text-[#C97A53]">{totalPrice} €</span>
        </div>
      </div>

      <input type="text" required placeholder={t('quote.name')} value={form.name}
        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
        className="w-full px-4 py-3 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#C97A53] text-[#2E4033] bg-white" />

      <input type="email" required placeholder={t('quote.email')} value={form.email}
        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
        className="w-full px-4 py-3 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#C97A53] text-[#2E4033] bg-white" />

      <input type="tel" placeholder={t('quote.phone')} value={form.phone}
        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
        className="w-full px-4 py-3 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#C97A53] text-[#2E4033] bg-white" />

      <input type="text" required placeholder={t('quote.country')} value={form.country}
        onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
        className="w-full px-4 py-3 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#C97A53] text-[#2E4033] bg-white" />

      <div>
        <label className="text-xs font-medium text-[#2E4033]/60 uppercase tracking-widest mb-2 block">{t('quote.profile')}</label>
        <div className="grid grid-cols-2 gap-2">
          {['particulier', 'grossiste'].map(p => (
            <button type="button" key={p}
              onClick={() => setForm(prev => ({ ...prev, profile: p as 'particulier' | 'grossiste' }))}
              className={`py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${form.profile === p ? 'border-[#2E4033] bg-[#2E4033] text-white' : 'border-[#E6DFD3] text-[#2E4033] hover:border-[#2E4033]'}`}>
              {p === 'particulier' ? t('quote.profile.particulier') : t('quote.profile.grossiste')}
            </button>
          ))}
        </div>
      </div>

      <textarea placeholder={t('quote.message')} rows={3} value={form.message}
        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
        className="w-full px-4 py-3 border border-[#E6DFD3] rounded-xl text-sm focus:outline-none focus:border-[#C97A53] text-[#2E4033] bg-white resize-none" />

      <button type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] disabled:opacity-70 text-white py-3.5 rounded-xl font-semibold transition-colors shadow-md">
        {loading ? (
          <><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> {lang === 'fr' ? 'Envoi...' : 'Sending...'}</>
        ) : (
          <><Send size={16} /> {t('quote.submit')}</>
        )}
      </button>
    </form>
  );
};

const CartSidebar: React.FC = () => {
  const { lang, t } = useLang();
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen, isQuoteOpen, setIsQuoteOpen } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setIsQuoteOpen(false);
    setTimeout(() => { setShowSuccess(false); setIsCartOpen(false); }, 3000);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#FAF7F2] z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E6DFD3]">
          <div className="flex items-center gap-2">
            {isQuoteOpen ? (
              <button onClick={() => setIsQuoteOpen(false)} className="mr-1 p-1 hover:bg-[#E6DFD3] rounded-lg transition-colors">
                <ArrowRight size={18} className="text-[#2E4033] rotate-180" />
              </button>
            ) : null}
            <ShoppingBag size={20} className="text-[#2E4033]" />
            <h2 className="font-serif font-semibold text-[#2E4033]">
              {isQuoteOpen ? t('quote.title') : t('cart.title')}
            </h2>
            {!isQuoteOpen && totalItems > 0 && (
              <span className="bg-[#C97A53] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{totalItems}</span>
            )}
          </div>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-[#E6DFD3] rounded-full transition-colors">
            <X size={18} className="text-[#2E4033]" />
          </button>
        </div>

        {/* Success state */}
        {showSuccess && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle size={64} className="text-[#2E4033] mb-4" />
            <h3 className="font-serif text-xl font-semibold text-[#2E4033] mb-2">{t('quote.success.title')}</h3>
            <p className="text-[#2E4033]/70">{t('quote.success.desc')}</p>
          </div>
        )}

        {/* Quote form */}
        {!showSuccess && isQuoteOpen && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 bg-[#2E4033]/5 text-xs text-[#2E4033]/60 text-center">{t('quote.subtitle')}</div>
            <QuoteForm onSuccess={handleSuccess} />
          </div>
        )}

        {/* Cart items */}
        {!showSuccess && !isQuoteOpen && (
          <>
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag size={48} className="text-[#E6DFD3] mb-4" />
                <h3 className="font-serif text-lg font-medium text-[#2E4033]/50 mb-2">{t('cart.empty')}</h3>
                <p className="text-sm text-[#2E4033]/40">{t('cart.empty.desc')}</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3 bg-white rounded-2xl p-3 shadow-sm">
                      <img
                        src={item.product.image}
                        alt={item.product.name[lang]}
                        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-serif text-sm font-medium text-[#2E4033] leading-tight">{item.product.name[lang]}</h4>
                          <button onClick={() => removeItem(item.product.id)} className="p-1 hover:text-red-500 transition-colors flex-shrink-0">
                            <Trash2 size={14} className="text-[#2E4033]/30" />
                          </button>
                        </div>
                        <p className="text-xs text-[#2E4033]/40 mt-0.5 line-clamp-1">{item.product.materials[lang]}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 border border-[#E6DFD3] rounded-lg">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#E6DFD3] rounded-lg transition-colors">
                              <Minus size={12} className="text-[#2E4033]" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium text-[#2E4033]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-[#E6DFD3] rounded-lg transition-colors">
                              <Plus size={12} className="text-[#2E4033]" />
                            </button>
                          </div>
                          <span className="font-semibold text-[#C97A53] text-sm">{item.product.price * item.quantity} €</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-[#E6DFD3] p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-[#2E4033]/70">{t('cart.total')}</span>
                    <span className="font-serif text-xl font-semibold text-[#C97A53]">~{totalPrice} €</span>
                  </div>
                  <p className="text-xs text-[#2E4033]/40 text-center">
                    {lang === 'fr' ? '* Prix indicatifs. Frais d\'expédition calculés sur devis.' : '* Indicative prices. Shipping calculated on quote.'}
                  </p>
                  <button onClick={() => setIsQuoteOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-[#2E4033] hover:bg-[#1a2b1f] text-white py-4 rounded-xl font-semibold transition-colors shadow-md">
                    <Send size={16} />
                    {t('cart.cta')}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
