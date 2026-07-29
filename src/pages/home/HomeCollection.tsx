import React, { useState, useEffect } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { getAllProducts } from '../../services/productService';

const HomeCollection: React.FC = () => {
  const { t, lang } = useLang();
  const { addItem, lastAdded } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.slice(0, 3));
      } catch (e) {
        console.error('Erreur chargement produits home:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="py-4 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('home.featured.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font text-[#2E4033] mb-4">
            {t('home.featured.title')}
          </h2>
          <p className="text-sm text-[#2E4033]/50 max-w-2xl mx-auto">
            {t('showroom.subtitle')}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-[4/5] w-full bg-[#EAE4D9]" />
                <div className="mt-3 h-5 w-2/3 bg-[#EAE4D9]" />
                <div className="mt-2 h-3 w-full bg-[#EAE4D9]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {products.slice(0, 3).map((product) => {
                const justAdded = lastAdded === product.id;
                const isHovered = hoveredId === product.id;

                return (
                <div
                  key={product.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div className="relative overflow-hidden bg-[#F5F1E9]">
                    <img
                      src={product.image}
                      alt={product.name[lang]}
                      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                      {product.inStock && (
                        <button
                          onClick={() => addItem(product)}
                          className={`absolute bottom-3 left-3 right-3 rounded-sm bg-[#F5F1E9] px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#2E4033] backdrop-blur transition-all duration-300 ${
                            isHovered
                              ? 'translate-y-0 opacity-100'
                              : 'translate-y-2 opacity-0'
                          } ${
                            justAdded
                              ? 'bg-[#2E4033] text-white'
                              : 'hover:bg-[#C97A53] hover:text-white'
                          }`}
                        >
                          {justAdded ? t('cart.added') : t('showroom.add')}
                        </button>
                      )}

                      {!product.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <span className="rounded-full bg-[#F5F1E9]/90 px-3 py-1.5 text-[10px] sm:text-xs font-medium text-[#2E4033] backdrop-blur-sm">
                            {t('showroom.outOfStock')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif text-base sm:text-lg text-[#2E4033] flex-1">
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
                              <Plus size={14} />
                            ) : (
                              <span className="text-lg leading-none">+</span>
                            )}
                          </button>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[#2E4033]/70 line-clamp-2">
                        {product.description[lang]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        <div className="text-center mt-12">
          <Link
            to="/showroom"
            className="group inline-flex items-center gap-2 border-2 border-[#2E4033] text-[#2E4033] px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:bg-[#2E4033] hover:text-white"
          >
            {t('showroom.viewall')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCollection;
