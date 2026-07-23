import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Check, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { products, categories } from '../data/products';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { lang, t } = useLang();
  const { addItem, lastAdded } = useCart();
  const [hover, setHover] = useState(false);
  const justAdded = lastAdded === product.id;

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image - taille réduite */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.image}
          alt={product.name[lang]}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            hover ? 'scale-105' : 'scale-100'
          }`}
          loading="lazy"
        />
        
        {/* Overlay élégant */}
        <div className={`absolute inset-0 bg-gradient-to-t from-[#2E4033]/60 via-[#2E4033]/0 to-transparent transition-opacity duration-500 ${
          hover ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Badge - plus raffiné */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[9px] font-light uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-sm ${
              product.badge.fr === 'Épuisé' 
                ? 'bg-black/50 text-white/70' 
                : 'bg-[#C97A53]/90 text-white shadow-lg shadow-[#C97A53]/20'
            }`}>
              {product.badge[lang]}
            </span>
          </div>
        )}

        {/* Quick view - plus discret */}
        <div className={`absolute top-3 right-3 z-10 transition-all duration-400 ${
          hover ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}>
          <button className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C97A53] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#C97A53]/30 group/btn">
            <Eye size={15} className="text-[#2E4033] group-hover/btn:text-white transition-colors" />
          </button>
        </div>

        {/* Add button - plus élégant */}
        {product.inStock && (
          <div className={`absolute bottom-3 left-3 right-3 z-10 transition-all duration-400 ${
            hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button
              onClick={() => addItem(product)}
              className={`w-full py-2.5 rounded-xl text-xs font-light tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${
                justAdded
                  ? 'bg-[#2E4033] text-white shadow-lg shadow-[#2E4033]/20'
                  : 'bg-white/95 backdrop-blur-sm text-[#2E4033] hover:bg-[#C97A53] hover:text-white hover:shadow-lg hover:shadow-[#C97A53]/20'
              }`}
            >
              {justAdded ? (
                <><Check size={13} className="stroke-[2]" /> {t('cart.added')}</>
              ) : (
                <><ShoppingBag size={13} className="stroke-[1.5]" /> {t('showroom.add')}</>
              )}
            </button>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="w-full py-2.5 rounded-xl bg-black/40 backdrop-blur-sm text-white/70 text-xs text-center font-light tracking-wide">
              {t('showroom.outofstock')}
            </div>
          </div>
        )}

        {/* Élément décoratif */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C97A53] to-[#2E4033] transition-all duration-500 ${
          hover ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>

      {/* Info - plus compact */}
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-sm font-medium text-[#2E4033] leading-tight truncate">
              {product.name[lang]}
            </h3>
            <p className="text-[10px] text-[#2E4033]/40 mt-0.5 truncate">
              {product.materials[lang]}
            </p>
          </div>
          <div className="flex-shrink-0">
            <span className="font-serif text-sm font-light text-[#C97A53]">
              {product.price}€
            </span>
          </div>
        </div>

        {/* Mobile add button - plus compact */}
        {product.inStock && (
          <button
            onClick={() => addItem(product)}
            className={`sm:hidden mt-2.5 w-full py-1.5 rounded-lg text-[10px] font-light flex items-center justify-center gap-1.5 border transition-all duration-300 ${
              justAdded
                ? 'border-[#2E4033] bg-[#2E4033] text-white'
                : 'border-[#E6DFD3] text-[#2E4033] hover:border-[#C97A53] hover:text-[#C97A53]'
            }`}
          >
            {justAdded ? (
              <><Check size={11} /> {t('cart.added')}</>
            ) : (
              <><ShoppingBag size={11} /> {t('showroom.add')}</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const Showroom: React.FC = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); } 
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="showroom" className="py-20 bg-gradient-to-b from-[#FAF7F2] to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C97A53]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#2E4033]/5 rounded-full blur-3xl" />
      
      {/* Ligne décorative supérieure */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C97A53]/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header - plus raffiné */}
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#C97A53]/60" />
            <span className="text-[10px] font-light text-[#C97A53] uppercase tracking-[0.3em]">
              {t('showroom.label')}
            </span>
            <span className="w-10 h-px bg-[#C97A53]/60" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#2E4033] mb-3">
            {t('showroom.title')}
          </h2>
          <div className="w-12 h-0.5 bg-[#C97A53]/30 mx-auto mb-3" />
          <p className="text-[#2E4033]/50 text-sm font-light max-w-md mx-auto">
            {t('showroom.subtitle')}
          </p>
        </div>

        {/* Filters - design épuré */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
              className={`px-4 py-1.5 rounded-full text-[11px] font-light tracking-wide transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#2E4033] text-white shadow-lg shadow-[#2E4033]/10'
                  : 'bg-white/80 text-[#2E4033]/60 hover:bg-[#E6DFD3] hover:text-[#2E4033] border border-[#E6DFD3]/50'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {/* Products Grid - cartes plus petites */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {displayed.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Show more - design élégant */}
        {filtered.length > 6 && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 text-[#2E4033] hover:text-[#C97A53] transition-colors duration-300"
            >
              <span className="text-sm font-light tracking-wide border-b border-[#2E4033]/20 group-hover:border-[#C97A53] pb-0.5">
                {t('showroom.viewall')}
              </span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Showroom;