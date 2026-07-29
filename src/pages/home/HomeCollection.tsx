import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Showroom from '../../components/Showroom';

const HomeCollection: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="py-5 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('home.featured.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font text-[#2E4033] mb-4">
            {t('home.featured.title')}
          </h2>
          <p className="text-sm text-[#2E4033]/50 max-w-2xl mx-auto">
            {t('showroom.subtitle')}
          </p>
        </div>

        <Showroom />

        <div className="text-center mt-12">
          <Link
            to="/showroom"
            className="group inline-flex items-center gap-2 border-2 border-[#2E4033] text-[#2E4033] px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:bg-[#2E4033] hover:text-white"
          >
            {t('showroom.viewall')}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCollection;
