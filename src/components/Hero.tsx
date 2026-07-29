import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden">
      <img
        src="https://earthy-artisanal-boutique.lovable.app/assets/hero-raphia-Bku4jKb_.jpg"
        alt="Cabas en raphia tressé main avec broderie florale au crochet"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/40 via-[#FAF7F2]/10 to-[#FAF7F2]/60" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-[#C97A53]">
            {t('hero.location')}
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] text-[#2E4033] sm:text-6xl lg:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-[#2E4033]/80">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/showroom"
              className="rounded-sm bg-[#C97A53] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white transition hover:bg-[#B86A45]"
            >
              {t('hero.cta.collection')}
            </Link>
            <Link
              to="/atelier"
              className="rounded-sm border border-[#2E4033]/40 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#2E4033] transition hover:border-[#2E4033] hover:bg-[#2E4033] hover:text-white"
            >
              {t('hero.cta.atelier')}
            </Link>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#2E4033]/70">
          <span className="inline-block h-8 w-px bg-[#2E4033]/40" />
          {t('hero.scroll')}
        </div>
      </div>
    </section>
  );
};

export default Hero;
