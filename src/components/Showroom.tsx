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
  

 

        {/* Products Grid - Style Airbnb 4 colonnes */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-3 border-[#C97A53] border-t-transparent" />
            <p className="mt-4 text-sm text-[#2E4033]/40">Chargement des produits...</p>
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles size={40} className="mx-auto text-[#2E4033]/20 mb-4" />
            <p className="text-sm text-[#2E4033]/40">Aucun produit dans cette catégorie</p>
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
              className="group inline-flex items-center gap-2 px-8 py-3 border-2 border-[#2E4033] text-[#2E4033] hover:bg-[#2E4033] hover:text-white rounded-full text-sm font-medium transition-all duration-300"
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