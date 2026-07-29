import React from 'react';
import { useLang } from '../../contexts/LanguageContext';

const ShowroomHero: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="bg-[#F5F1E9] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div className="text-left">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-[#C97A53] sm:text-[11px]">
              {t('showroom.label')}
            </p>
            <h1 className="font-serif text-4xl leading-[1.1] text-[#2E4033] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
              {t('showroom.title')}
            </h1>
          </div>
          <div className="flex items-start text-left md:pt-2 lg:pt-3">
            <p className="max-w-xl text-sm leading-relaxed text-[#2E4033]/70 sm:text-base md:text-lg lg:text-xl">
              {t('showroom.subtitle')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomHero;
