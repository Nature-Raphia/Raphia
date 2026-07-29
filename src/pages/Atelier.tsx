import React from 'react';
import {
  Users,
  Leaf,
  TreePine,
  Clock,
} from 'lucide-react';
import Atelier from '../components/Atelier';
import { useLang } from '../contexts/LanguageContext';

const AtelierPage: React.FC = () => {
  const { lang, t } = useLang();

  const stats = [
    {
      value: '40',
      suffix: '+',
      icon: Users,
      title: t('story.stat1'),
      description: t('story.stat1.desc'),
    },
    {
      value: '100',
      suffix: '%',
      icon: Leaf,
      title: t('story.stat2'),
      description: t('story.stat2.desc'),
    },
    {
      value: '0',
      suffix: '',
      icon: TreePine,
      title: t('story.stat3'),
      description: t('story.stat3.desc'),
    },
    {
      value: '12',
      suffix: '',
      icon: Clock,
      title: t('story.stat4'),
      description: t('story.stat4.desc'),
    },
  ];

  return (
    <div className="pt-16 md:pt-20">
      <Atelier />

      {/* =====================================================
          SECTION IMPACT
      ===================================================== */}
 <section className="relative overflow-hidden bg-[#2E4033] py-24 sm:py-28 md:py-36 lg:py-40">

  {/* DÉCORATION DE FOND */}
  <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#F5F1E9]/[0.03] blur-3xl" />
  <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#C97A53]/[0.03] blur-3xl" />

  {/* PETITE LIGNE SUPÉRIEURE */}
  <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-[#C97A53]/40" />

  <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

    {/* =================================================
        HEADER
    ================================================= */}
    <div className="mx-auto max-w-4xl text-center">

      {/* LABEL */}
      <div className="mb-7 flex items-center justify-center gap-4">
        <span className="h-px w-10 bg-[#C97A53]/40" />
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#C97A53] sm:text-[11px]">
          {t('story.impact.label')}
        </span>
        <span className="h-px w-10 bg-[#C97A53]/40" />
      </div>

      {/* TITRE */}
      <h2
        className={`font-serif font-light leading-[1.08] tracking-[-0.02em] text-white ${
          lang === 'en'
            ? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
            : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
        }`}
      >
        {t('story.impact.title')}
      </h2>

      {/* LIGNE DÉCORATIVE */}
      <div className="mx-auto mt-7 h-px w-16 bg-[#C97A53]/50" />

      {/* DESCRIPTION */}
      <p className="mx-auto mt-7 max-w-2xl text-sm font-light leading-7 text-white/60 sm:text-base">
        {t('story.subtitle')}
      </p>

    </div>

    {/* =================================================
        CONTENU À DEUX COLONNES : IMAGE + STATISTIQUES
    ================================================= */}
    <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

      {/* COLONNE GAUCHE - IMAGE */}
      <div className="relative order-2 lg:order-1">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="src/assets/images/atelier-crochet.jpg"
            alt="Artisanat Mahalia - Atelier"
            className="w-full h-auto object-cover aspect-[4/3] rounded-2xl"
            loading="lazy"
          />
          
          {/* OVERLAY DÉCORATIF SUR L'IMAGE */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E4033]/40 via-transparent to-transparent rounded-2xl" />
          
          {/* BADGE SUR L'IMAGE */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="inline-block bg-[#2E4033]/80 backdrop-blur-sm rounded-full px-4 py-2 text-[10px] font-medium tracking-[0.2em] text-white/80">
              ✦ Atelier Mahalia
            </div>
          </div>
        </div>
        
        {/* ÉLÉMENT DÉCORATIF AUTOUR DE L'IMAGE */}
        <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#C97A53]/20 rounded-full -z-10" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-[#C97A53]/20 rounded-full -z-10" />
      </div>

      {/* COLONNE DROITE - STATISTIQUES */}
      <div className="order-1 lg:order-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className={`
                  group relative px-4 py-6 text-center
                  transition-all duration-500
                  hover:-translate-y-1
                  rounded-2xl bg-white/5 backdrop-blur-sm
                  border border-white/5
                  hover:border-[#C97A53]/30
                  ${index % 2 === 0 ? 'sm:pr-4' : 'sm:pl-4'}
                `}
              >

                {/* ICÔNE */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-[#C97A53]/40 group-hover:bg-[#C97A53]">

                  <Icon
                    size={20}
                    strokeWidth={1.4}
                    className="text-white/70 transition-colors duration-500 group-hover:text-white"
                  />

                </div>

                {/* CHIFFRE */}
                <div className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl">

                  {stat.value}

                  {stat.suffix && (
                    <span className="text-[#C97A53]">
                      {stat.suffix}
                    </span>
                  )}

                </div>

                {/* TITRE */}
                <h3 className="mt-2 font-serif text-base font-normal text-white/90 sm:text-lg">
                  {stat.title}
                </h3>

                {/* PETITE LIGNE */}
                <div className="mx-auto mt-3 h-px w-8 bg-[#C97A53]/50 transition-all duration-500 group-hover:w-12" />

                {/* DESCRIPTION */}
                <p className="mx-auto mt-3 max-w-xs text-xs font-light leading-5 text-white/50 sm:text-sm">
                  {stat.description}
                </p>

              </div>
            );
          })}

        </div>
      </div>

    </div>

  </div>
</section>
    </div>
  );
};

export default AtelierPage;