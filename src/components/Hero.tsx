import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight, Leaf, Award, Handshake } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background avec overlay plus doux et texturé */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1920&q=85"
          alt="Nature Raphia Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E4033]/85 via-[#2E4033]/60 to-[#2E4033]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A261E]/80 via-[#2E4033]/30 to-transparent" />
        <div className="absolute inset-0 bg-[#2E4033]/20 backdrop-blur-[1px]" />
      </div>

      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C97A53]/10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-[#E6DFD3]/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-2/3 right-1/3 w-48 h-48 rounded-full bg-[#D4A373]/10 blur-2xl animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Contenu principal - LARGEUR RÉDUITE */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-2xl"> {/* Réduit de max-w-3xl à max-w-2xl */}

          {/* Badge de localisation */}
          <div className={`inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2 mb-8 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-2 h-2 rounded-full bg-[#C97A53] animate-pulse" />
            <span className="text-white/80 text-xs tracking-[0.15em] uppercase font-light">
              {t('hero.location')}
            </span>
            <span className="w-px h-4 bg-white/20" />
            <Leaf size={12} className="text-[#C97A53]" />
          </div>

          {/* Titre principal */}
          <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('hero.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 2 ? (
                  <span className="font-medium italic text-[#E6DFD3]">{line}</span>
                ) : (
                  <span className="font-light">{line}</span>
                )}
              </span>
            ))}
          </h1>

          {/* Sous-titre */}
          <p className={`text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('hero.subtitle')}
          </p>

          {/* Boutons CTA */}
          <div className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link
              to="/showroom"
              className="group flex items-center gap-3 bg-[#C97A53] hover:bg-[#a8623e] text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#C97A53]/40"
            >
              {t('hero.cta.collection')}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/atelier"
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300"
            >
              {t('hero.cta.atelier')}
            </Link>
          </div>

        </div>
      </div>

      {/* Indicateur de scroll */}
      <Link
        to="/showroom"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors duration-300 z-10 group"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-light">{t('hero.scroll')}</span>
        <ChevronDown size={18} className="animate-bounce group-hover:translate-y-1 transition-transform" />
      </Link>

      {/* Carte produit flottante */}
      <Link
        to="/showroom"
        className={`hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 z-10 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
      >
       
      </Link>
    </section>
  );
};

export default Hero;