import React from 'react';
import { BookOpen } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const WHATSAPP_NUMBER = '261328932808';

const ShowroomHero: React.FC = () => {
  const { t } = useLang();
  const catalogueUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(t('showroom.catalogMessage'))}`;

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
          <div className="flex flex-col items-start text-left md:pt-2 lg:pt-3">
            <p className="max-w-xl text-sm leading-relaxed text-[#2E4033]/70 sm:text-base md:text-lg lg:text-xl">
              {t('showroom.subtitle')}
            </p>
            <a
              href={catalogueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C97A53] px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#a8623e]"
            >
              <BookOpen size={18} />
              {t('showroom.discoverCatalog')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomHero;
