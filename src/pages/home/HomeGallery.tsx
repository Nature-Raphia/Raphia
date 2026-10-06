import React, { useEffect, useState } from 'react';
import { useLang } from '../../contexts/LanguageContext';
import { getAtelierSteps } from '../../services/atelierService';
import type { AtelierStep } from '../../types';

const HomeGallery: React.FC = () => {
  const { t, lang } = useLang();
  const [steps, setSteps] = useState<AtelierStep[]>([]);

  useEffect(() => {
    let cancelled = false;

    getAtelierSteps().then(rows => {
      if (!cancelled) setSteps(rows);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Galerie entièrement alimentée par l'onglet Atelier de l'admin :
  // sans étape enregistrée, la section n'est pas affichée.
  if (steps.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('home.gallery.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl  text-[#2E4033] mb-4">
            {t('home.gallery.title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div key={step.id} className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'row-span-2 aspect-[4/5]' : 'aspect-square'}`}>
              <img
                src={step.image}
                alt={step.title[lang] || step.title.fr}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
