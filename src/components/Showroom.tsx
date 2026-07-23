import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Check, Eye } from 'lucide-react';
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
      className="product-card bg-white rounded-2xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name[lang]}
          className={`w-full h-full object-cover transition-transform duration-700 ${hover ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
        {/* Overlay */}
        <div className={`absolute inset-0 bg-[#2E4033]/30 transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-0'}`} />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${
              product.badge.fr === 'Épuisé' ? 'bg-gray-500 text-white' : 'bg-[#C97A53] text-white'
            }`}>
              {product.badge[lang]}
            </span>
          </div>
        )}

        {/* Quick view */}
        <div className={`absolute top-3 right-3 transition-all duration-300 ${hover ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
          <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow">
            <Eye size={14} className="text-[#2E4033]" />
          </button>
        </div>

        {/* Add button overlay */}
        {product.inStock && (
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={() => addItem(product)}
              className={`w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                justAdded
                  ? 'bg-[#2E4033] text-white'
                  : 'bg-white text-[#2E4033] hover:bg-[#C97A53] hover:text-white'
              }`}
            >
              {justAdded ? (
                <><Check size={14} /> {t('cart.added')}</>
              ) : (
                <><ShoppingBag size={14} /> {t('showroom.add')}</>
              )}
            </button>
          </div>
        )}

        {!product.inStock && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="w-full py-2.5 rounded-xl bg-gray-200/80 text-gray-500 text-sm text-center font-medium">
              {t('showroom.outofstock')}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-serif font-medium text-[#2E4033] text-base leading-tight">{product.name[lang]}</h3>
            <p className="text-xs text-[#2E4033]/50 mt-1 line-clamp-1">{product.materials[lang]}</p>
          </div>
          <div className="text-right">
            <span className="font-semibold text-[#C97A53] text-base">{product.price} €</span>
          </div>
        </div>

        {/* Mobile add button */}
        {product.inStock && (
          <button
            onClick={() => addItem(product)}
            className={`sm:hidden mt-3 w-full py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-2 border transition-all ${
              justAdded
                ? 'border-[#2E4033] bg-[#2E4033] text-white'
                : 'border-[#E6DFD3] text-[#2E4033] hover:border-[#C97A53] hover:text-[#C97A53]'
            }`}
          >
            {justAdded ? <><Check size={12} /> {t('cart.added')}</> : <><ShoppingBag size={12} /> {t('showroom.add')}</>}
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
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="showroom" className="py-24 bg-[#E6DFD3]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('showroom.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
            {t('showroom.title')}
          </h2>
          <p className="text-[#2E4033]/70 max-w-xl mx-auto">{t('showroom.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#2E4033] text-white shadow-md'
                  : 'bg-white text-[#2E4033] hover:bg-[#E6DFD3] border border-[#E6DFD3]'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
          {displayed.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Show more */}
        {filtered.length > 6 && !showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 border-2 border-[#2E4033] text-[#2E4033] hover:bg-[#2E4033] hover:text-white px-8 py-3 rounded-full font-medium transition-all duration-200"
            >
              {t('showroom.viewall')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Showroom;
