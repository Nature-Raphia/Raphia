import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://earthy-artisanal-boutique.lovable.app/assets/hero-raphia-Bku4jKb_.jpg"
          alt="Handwoven raphia tote with floral crochet embroidery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A261E]/60 via-[#2E4033]/30 to-[#2E4033]/10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#C97A53] animate-pulse" />
            <span className="text-white/80 text-xs tracking-[0.15em] uppercase font-light">
              {t('hero.location')}
            </span>
            <span className="w-px h-4 bg-white/20" />
          </span>
        </div>

        <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-wide mb-8 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 60px rgba(255,255,255,0.2), 0 0 100px rgba(255,255,255,0.1)' }}>
          {t('hero.title')}
        </h1>

        <p className={`text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ textShadow: '0 0 20px rgba(255,255,255,0.15)' }}>
          {t('hero.subtitle')}
        </p>

        <div className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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

      <Link
        to="/showroom"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors duration-300 z-10 group"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-light">{t('hero.scroll')}</span>
        <ChevronDown size={18} className="animate-bounce group-hover:translate-y-1 transition-transform" />
      </Link>
    </section>
  );
};

export default Hero;