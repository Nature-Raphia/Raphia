import React, { useEffect, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLang();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1920&q=85"
          alt="Nature Raphia Hero"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E4033]/80 via-[#2E4033]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E4033]/60 via-transparent to-transparent" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#C97A53]/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-[#FAF7F2]/10 blur-2xl animate-pulse" style={{animationDelay:'1s'}} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          {/* Location badge */}
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-2 h-2 rounded-full bg-[#C97A53] animate-pulse" />
            <span className="text-white/90 text-xs tracking-widest uppercase font-medium">{t('hero.location')}</span>
          </div>

          {/* Title */}
          <h1 className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('hero.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 2 ? <span className="italic text-[#E6DFD3]">{line}</span> : line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className={`text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-lg transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <button onClick={() => scrollTo('showroom')}
              className="flex items-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] text-white px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105 shadow-lg shadow-[#C97A53]/30">
              {t('hero.cta.collection')}
              <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo('atelier')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-medium text-sm transition-all duration-200">
              {t('hero.cta.atelier')}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-16 flex flex-wrap gap-8 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {[
            { value: '12+', label: { fr: "Ans d'expertise", en: "Years of expertise" } },
            { value: '40+', label: { fr: 'Artisanes', en: 'Artisans' } },
            { value: '100%', label: { fr: 'Naturel', en: 'Natural' } },
          ].map((stat, i) => (
            <div key={i} className="text-white/90">
              <div className="font-serif text-3xl font-semibold text-[#E6DFD3]">{stat.value}</div>
              <div className="text-xs text-white/60 mt-1 uppercase tracking-widest">{stat.label.fr}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button onClick={() => scrollTo('atelier')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors animate-bounce z-10">
        <span className="text-xs uppercase tracking-widest">{t('hero.scroll')}</span>
        <ChevronDown size={20} />
      </button>

      {/* Product preview floating card */}
      <div className={`hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 z-10 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 w-52">
          <img
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80"
            alt="Cabas Solstice"
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <div className="text-white">
            <div className="text-xs text-white/60 uppercase tracking-widest mb-1">Pièce signature</div>
            <div className="font-serif text-sm font-medium">Cabas Solstice</div>
            <div className="text-[#C97A53] font-semibold text-sm mt-1">85 €</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
