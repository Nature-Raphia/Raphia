import React from 'react';
import { useLang } from '../../contexts/LanguageContext';

const B2BIntro: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              {t('b2b.intro.label')}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#2E4033] leading-tight mb-6">
              {t('brand.tagline')}
            </h2>

            <p className="text-[#2E4033]/70 leading-relaxed mb-4">
              {t('b2b.intro.p1')}
            </p>
            <p className="text-[#2E4033]/70 leading-relaxed">
              {t('b2b.intro.p2')}
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="/5.jpeg"
              alt={t('b2b.intro.alt')}
              className="w-full rounded-2xl object-cover shadow-xl shadow-black/10"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BIntro;
