import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Check, Eye, ArrowRight, Sparkles, Heart, Star } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { categories as initialCategories } from '../data/products';
import { Product } from '../types';
import { getAllProducts } from '../services/productService';
import { supabase } from '../services/supabase';

// Interface pour les catégories
interface Category {
  id: string;
  name_fr: string;
  name_en: string;
  slug: string;
  sort_order: number;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { lang, t } = useLang();
  const { addItem, lastAdded } = useCart();
  const [hover, setHover] = useState(false);
  const [liked, setLiked] = useState(false);
  const justAdded = lastAdded === product.id;

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image Container - Style Airbnb */}
      <div className="relative overflow-hidden rounded-2xl bg-[#F5F5F5]">
        <div className="aspect-square w-full">
          <img
            src={product.image}
            alt={product.name[lang]}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              hover ? 'scale-105' : 'scale-100'
            }`}
            loading="lazy"
          />
        </div>

        {/* Overlay gradient subtil */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${
          hover ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Badge - Style Airbnb */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[10px] font-medium px-3 py-1 rounded-full ${
              product.badge.fr === 'Épuisé' 
                ? 'bg-black/60 text-white/80 backdrop-blur-sm' 
                : 'bg-white/90 text-[#2E4033] shadow-sm backdrop-blur-sm'
            }`}>
              {product.badge[lang]}
            </span>
          </div>
        )}

        {/* Like button - Style Airbnb */}
        <button 
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${liked ? 'fill-red-500 text-red-500' : 'text-[#2E4033]'}`}
          />
        </button>

        {/* Price badge - Style Airbnb */}
        <div className={`absolute bottom-3 left-3 right-3 z-10 transition-all duration-400 ${
          hover ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <button
            onClick={() => addItem(product)}
            className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
              justAdded
                ? 'bg-[#2E4033] text-white shadow-lg'
                : 'bg-white text-[#2E4033] hover:bg-[#C97A53] hover:text-white shadow-lg hover:shadow-[#C97A53]/20'
            }`}
          >
            {justAdded ? (
              <><Check size={16} /> {t('cart.added')}</>
            ) : (
              <><ShoppingBag size={16} /> {t('showroom.add')}</>
            )}
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <div className="w-full py-2.5 rounded-xl bg-black/50 backdrop-blur-sm text-white/80 text-sm text-center font-medium">
              {t('showroom.outOfStock')}
            </div>
          </div>
        )}

        {/* Quick view button - Style Airbnb */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${
          hover ? 'opacity-100' : 'opacity-0'
        }`}>
     
        </div>
      </div>

      {/* Info - Style Airbnb */}
      <div className="mt-2.5 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-sm font-medium text-[#2E4033] leading-tight truncate">
              {product.name[lang]}
            </h3>
            <p className="text-xs text-[#2E4033]/40 truncate">
              {product.materials?.[lang] || ''}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={14} className="fill-[#C97A53] text-[#C97A53]" />
            <span className="text-xs font-medium text-[#2E4033]">4.8</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="font-serif text-sm text-[#C97A53]">
            {product.price.toLocaleString()} Ar
          </span>
          {product.inStock && (
            <button
              onClick={() => addItem(product)}
              className={`text-xs font-medium transition-colors ${
                justAdded 
                  ? 'text-[#2E4033]' 
                  : 'text-[#C97A53] hover:text-[#a8623e]'
              }`}
            >
              {justAdded ? '✓ ' + t('showroom.adding') : t('showroom.add')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Showroom: React.FC = () => {
  const { lang, t } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Observer pour l'animation
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Charger les produits et catégories
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Charger les produits
        const productData = await getAllProducts();
        setProducts(productData);

        // Charger les catégories depuis Supabase
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedCategories = data.map(cat => ({
            id: cat.slug || cat.id,
            name_fr: cat.name_fr,
            name_en: cat.name_en,
            slug: cat.slug,
            sort_order: cat.sort_order
          }));
          setCategories(formattedCategories);
        } else {
          setCategories(initialCategories.map(cat => ({
            id: cat.id,
            name_fr: cat.label.fr,
            name_en: cat.label.en,
            slug: cat.id,
            sort_order: 0
          })));
        }
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
        setCategories(initialCategories.map(cat => ({
          id: cat.id,
          name_fr: cat.label.fr,
          name_en: cat.label.en,
          slug: cat.id,
          sort_order: 0
        })));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 8);

  return (
    <section id="showroom" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Style Airbnb */}
    

        {/* Filters - Style Airbnb avec scroll horizontal */}
        <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => { setActiveCategory('all'); setShowAll(false); }}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-[#2E4033] text-white shadow-md'
                : 'bg-white text-[#2E4033]/70 hover:bg-[#F5F5F5] border border-[#E6DFD3]'
            }`}
          >
            Tous
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#2E4033] text-white shadow-md'
                  : 'bg-white text-[#2E4033] hover:bg-[#F5F5F5] border border-[#E6DFD3]'
              }`}
            >
              {lang === 'fr' ? cat.name_fr : cat.name_en}
            </button>
          ))}
        </div>

        {/* Products Grid - Style Airbnb 4 colonnes */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-[#C97A53] border-t-transparent" />
            <p className="mt-4 text-xs text-[#2E4033]/40">{t('showroom.loading')}</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles size={40} className="mx-auto text-[#2E4033]/20 mb-4" />
            <p className="text-xs text-[#2E4033]/40">{t('showroom.noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayed.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Show more - Style Airbnb */}
        {filtered.length > 8 && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 px-8 py-3 border-2 border-[#2E4033] text-[#2E4033] hover:bg-[#2E4033] hover:text-white rounded-full text-xs font-semibold transition-all duration-300"
            >
              <span>Afficher plus ({filtered.length - 8} restants)</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        )}
      </div>

      {/* CSS pour cacher la scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Showroom;