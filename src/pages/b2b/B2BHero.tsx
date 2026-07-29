import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const B2BHero: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="relative isolate py-10 min-h-[60vh] w-full overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
        alt="B2B Nature Raphia"
        className="absolute inset-0 h-full w-full object-cover opacity-60 drop-shadow-2xl shadow-black/60"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E4033]/80 via-[#2E4033]/60 to-[#2E4033]/80" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.7)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E4033]/80 via-[#2E4033]/60 to-[#2E4033]/80" />
      <div className="relative z-10 flex min-h-[60vh] items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6 drop-shadow-md">
            {t('b2b.hero.title')}
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-sm">
            {t('b2b.hero.subtitle')}
          </p>

          <Link
            to="/showroom"
            className="inline-flex items-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#C97A53]/40 shadow-black/30 drop-shadow-md"
          >
            {t('b2b.hero.cta')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default B2BHero;
