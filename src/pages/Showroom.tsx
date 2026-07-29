import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import Showroom from '../components/Showroom';
import { Link } from 'react-router-dom';

const ShowroomPage: React.FC = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* HERO SECTION */}
      <section className="bg-[#F5F1E9] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 md:gap-12 lg:gap-20">

            {/* COLONNE GAUCHE */}
            <div className="text-left">
              {/* SURTITRE */}
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-[#C97A53] sm:text-[11px]">
                {t('showroom.label')}
              </p>

              {/* TITRE */}
              <h1 className="font-serif text-4xl leading-[1.1] text-[#2E4033] sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
                {t('showroom.title')}
              </h1>
            </div>

            {/* COLONNE DROITE */}
            <div className="flex items-start text-left md:pt-2 lg:pt-3">
              <p className="max-w-xl text-sm leading-relaxed text-[#2E4033]/70 sm:text-base md:text-lg lg:text-xl">
                {t('showroom.subtitle')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SHOWROOM SECTION */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="px-4 sm:px-6 lg:px-10">
          <Showroom />
        </div>
      </section>

      {/* CTA SECTION - SUR MESURE */}
      <section className="relative min-h-[400px] sm:min-h-[450px] md:min-h-[520px] lg:min-h-[580px] overflow-hidden bg-[#2E4033]">
        {/* IMAGE DE FOND */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/atelier-tri.webp"
            alt={t('showroom.atelierImageAlt')}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* OVERLAY SOMBRE */}
          <div className="absolute inset-0 bg-[#2E4033]/60" />
          {/* DÉGRADÉ POUR UNE MEILLEURE LISIBILITÉ */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E4033]/95 via-[#2E4033]/70 to-transparent" />
        </div>

        {/* CONTENU */}

<div className="relative overflow-hidden">
  {/* IMAGE D'ARRIÈRE-PLAN */}
    <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
      alt={t('showroom.ctaAlt')}
      className="h-full w-full object-cover opacity-30"
    />

    {/* OVERLAY LÉGER */}
    <div className="absolute inset-0 bg-black/20" />

    {/* DÉGRADÉ POUR AMÉLIORER LA LISIBILITÉ */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
  </div>

  {/* CONTENU */}
  <div className="relative z-10 mx-auto flex min-h-[400px] sm:min-h-[450px] md:min-h-[520px] lg:min-h-[580px] max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-10">
    <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:text-left">

      {/* SURTITRE */}
        <div className="mb-4 flex items-center justify-center gap-3 sm:mb-6 sm:justify-start">
        <span className="h-px w-8 bg-[#C97A53] sm:w-10" />

        <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#E0A17F] sm:text-[10px]">
          {t('showroom.ctaTitle')}
        </span>
      </div>

      {/* TITRE */}
      <h2 className="font-serif text-3xl font-light leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {t('showroom.ctaTitle')}
      </h2>

      {/* DESCRIPTION */}
      <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-white/85 sm:mx-0 sm:mt-5 sm:text-sm sm:leading-7 md:mt-7 md:text-base">
        {t('showroom.ctaText')}
      </p>

      {/* BOUTON */}
      <div className="mt-6 flex justify-center sm:mt-8 sm:justify-start md:mt-9">
        <Link
          to="/contact"
          className="group inline-flex items-center gap-2 rounded-full bg-[#C97A53] px-5 py-3 text-[9px] font-medium uppercase tracking-[0.25em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B86A45] hover:shadow-xl sm:gap-3 sm:px-6 sm:py-3.5 sm:text-[10px] md:px-7"
        >
            <span>{t('showroom.contactUs')}</span>

          <ArrowRight
            size={14}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

    </div>
  </div>
</div>





        {/* ÉLÉMENTS DÉCORATIFS */}
        <div className="pointer-events-none absolute -bottom-12 sm:-bottom-16 -right-12 sm:-right-16 h-32 sm:h-40 md:h-48 w-32 sm:w-40 md:w-48 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 rounded-full border border-[#E0A17F]/30" />
      </section>
    </div>
  );
};

export default ShowroomPage;