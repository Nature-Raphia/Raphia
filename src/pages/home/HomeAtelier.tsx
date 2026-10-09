import React, { useEffect, useState } from 'react';
import { useLang } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import atelierImage from '../../assets/images/atelier-crochet.jpg';
import { getHomeAtelierSection } from '../../services/atelierService';
import type { HomeAtelierSection } from '../../types';

const HomeAtelier: React.FC = () => {
  const { t, lang } = useLang();
  // Contenu saisi depuis l'admin ; sinon textes et photo par défaut du site
  const [dbSection, setDbSection] = useState<HomeAtelierSection | null>(null);

  useEffect(() => {
    let cancelled = false;

    getHomeAtelierSection().then(section => {
      if (cancelled || !section) return;
      setDbSection(section);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const text = (field: 'label' | 'title' | 'subtitle' | 'cta') =>
    dbSection?.[field][lang] || dbSection?.[field].fr || t(`atelier.${field}`);

  return (
    <section className="bg-[#FAF7F2] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={dbSection?.image || atelierImage}
              alt="Atelier Nature Raphia"
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              {text('label')}
              <span className="w-8 h-px bg-[#C97A53]" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2E4033] mb-6">
              {text('title')}
            </h2>
            <p className="text-[#2E4033]/60 leading-relaxed mb-8">
              {text('subtitle')}
            </p>
            <Link
              to="/atelier"
              className="inline-flex items-center gap-2 bg-[#2E4033] hover:bg-[#C97A53] text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:shadow-xl"
            >
              {text('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAtelier;
