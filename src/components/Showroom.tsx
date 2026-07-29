import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import { getAllProducts } from '../services/productService';
import { supabase } from '../services/supabase';

interface Category {
  id: string;
  name_fr: string;
  name_en: string;
  slug: string;
  sort_order: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { lang, t } = useLang();
  const { addItem, lastAdded } = useCart();

  const [hover, setHover] = useState(false);
  const justAdded = lastAdded === product.id;

  return (
    <article
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden bg-[#F5F1E9]">
        <img
          src={product.image}
          alt={product.name[lang]}
          className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dégradé léger au survol */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${
            hover ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* BADGE */}
        {product.badge && (
          <div className="absolute left-3 sm:left-4 top-3 sm:top-4 z-10">
            <span className="rounded-full bg-[#2E4033]/80 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[8px] sm:text-[10px]  text-white backdrop-blur-sm">
              {product.badge[lang]}
            </span>
          </div>
        )}

        {/* BOUTON AJOUTER */}
        {product.inStock && (
          <button
            onClick={() => addItem(product)}
            className={`absolute bottom-3 sm:bottom-4 right-3 sm:right-4 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur transition-all duration-300 ${
              hover
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            } ${
              justAdded
                ? 'bg-[#2E4033]/90 text-white'
                : 'bg-[#F5F1E9]/90 text-[#2E4033] hover:bg-[#C97A53] hover:text-white'
            }`}
          >
            {justAdded ? (
              <span className="flex items-center gap-1.5 sm:gap-2">
                <Check size={11} className="sm:size-[13px]" />
                {t('cart.added')}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 sm:gap-2">
                <ShoppingBag size={11} className="sm:size-[13px]" />
                {t('showroom.add')}
              </span>
            )}
          </button>
        )}

        {/* RUPTURE DE STOCK */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="rounded-full bg-[#F5F1E9]/90 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-medium text-[#2E4033] backdrop-blur-sm">
              {t('showroom.outOfStock')}
            </span>
          </div>
        )}
      </div>

      {/* INFORMATIONS PRODUIT */}
      <div className="px-1 sm:px-0">
        <div className="mt-4 sm:mt-6 flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl sm:text-2xl text-[#2E4033] flex-1">
            {product.name[lang]}
          </h3>
          {product.inStock && (
            <button
              onClick={() => addItem(product)}
              className={`shrink-0 rounded-md w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                justAdded
                  ? 'bg-[#2E4033] border-[#2E4033] text-white'
                  : 'border-[#2E4033]/20 text-[#2E4033] hover:border-[#C97A53] hover:text-[#C97A53]'
              }`}
            >
              {justAdded ? (
                <Check size={14} />
              ) : (
                <span className="text-lg leading-none">+</span>
              )}
            </button>
          )}
        </div>

        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-[#2E4033]/70">
          {product.description[lang]}
        </p>
      </div>
    </article>
  );
};

const Collection: React.FC = () => {
  const { lang, t } = useLang();

  const [products, setProducts] = useState<Product[]>([]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'all',
      name_fr: 'Tous',
      name_en: 'All',
      slug: 'all',
      sort_order: 0,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  /*
   * ANIMATION D'APPARITION
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  /*
   * CHARGEMENT DES PRODUITS + CATÉGORIES
   */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const [productData, categoryResult] = await Promise.all([
          getAllProducts(),
          supabase
            .from('categories')
            .select('*')
            .order('sort_order', {
              ascending: true,
            }),
        ]);

        // PRODUITS DYNAMIQUES
        setProducts(productData);

        // CATÉGORIES DEPUIS SUPABASE
        if (categoryResult.error) {
          throw categoryResult.error;
        }

        if (
          categoryResult.data &&
          categoryResult.data.length > 0
        ) {
          setCategories([
            {
              id: 'all',
              name_fr: 'Tous',
              name_en: 'All',
              slug: 'all',
              sort_order: 0,
            },
            ...categoryResult.data.map((cat: any) => ({
              id: cat.slug || cat.id,
              name_fr:
                cat.name_fr ??
                cat.name_en ??
                '',
              name_en:
                cat.name_en ??
                cat.name_fr ??
                '',
              slug: cat.slug || cat.id,
              sort_order:
                cat.sort_order ?? 0,
            })),
          ]);
        } else {
          // FALLBACK : Création des catégories à partir des produits existants
          const uniqueCategories = Array.from(
            new Set(
              productData
                .map((product) => product.category)
                .filter(Boolean)
            )
          );

          setCategories([
            {
              id: 'all',
              name_fr: 'Tous',
              name_en: 'All',
              slug: 'all',
              sort_order: 0,
            },
            ...uniqueCategories.map(
              (slug, index) => ({
                id: slug,
                name_fr: slug,
                name_en: slug,
                slug,
                sort_order: index + 1,
              })
            ),
          ]);
        }
      } catch (error) {
        console.error(
          'Erreur lors du chargement du showroom :',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // FILTRAGE DYNAMIQUE
  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter(
          (product) =>
            product.category === activeCategory
        );

  return (
    <section
      id="collections"
      ref={ref}
      className="bg-[#FAF7F2] py-5 sm:py-8 md:py-2"
    >
      <div className="mx-auto max-w-7xl px-1 sm:px-2 lg:px-10">
        
     

        {/* CATÉGORIES - STYLE INSPIRÉ DE L'IMAGE "TOUT · SACS · CHAPEAUX · MAISON" */}
        {categories.length > 1 && (
          <div className="mb-10 sm:mb-14 md:mb-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-[#2E4033]/10 pb-4 sm:pb-5">
            {categories.map((category, index) => (
              <React.Fragment key={category.id}>
                <button
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.1em] transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'text-[#2E4033]'
                      : 'text-[#2E4033]/40 hover:text-[#2E4033]/70'
                  }`}
                >
                  {lang === 'fr' ? category.name_fr : category.name_en}
                  
                  {/* INDICATEUR SOUS LA CATÉGORIE ACTIVE */}
                  {activeCategory === category.id && (
                    <span className="absolute -bottom-[5px] sm:-bottom-[6px] left-0 right-0 mx-auto h-[2px] w-6 bg-[#C97A53] rounded-full" />
                  )}
                </button>
                
                {/* SÉPARATEUR ENTRE LES CATÉGORIES (sauf après la dernière) */}
                {index < categories.length - 1 && (
                  <span className="text-[#2E4033]/20 text-sm select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-1 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-10 lg:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-[4/5] w-full bg-[#EAE4D9]" />
                <div className="mt-4 sm:mt-6 h-6 sm:h-7 w-2/3 bg-[#EAE4D9]" />
                <div className="mt-2 sm:mt-3 h-3 sm:h-4 w-full bg-[#EAE4D9]" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* AUCUN PRODUIT */
          <div className="py-16 sm:py-20 text-center">
            <Sparkles
              size={32}
              className="sm:size-[40px] mx-auto mb-3 sm:mb-4 text-[#2E4033]/20"
            />
            <p className="text-sm text-[#2E4033]/50">
              {t('showroom.noProducts')}
            </p>
          </div>
        ) : (
          /* GRILLE DYNAMIQUE */
          <div className="grid grid-cols-1 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-10 lg:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>

      {/* SCROLLBAR HORIZONTAL CACHÉE */}
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

export default Collection;