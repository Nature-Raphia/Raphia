import React, { useState } from 'react';
import { ArrowRight, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import Showroom from '../components/Showroom';
import { Link } from 'react-router-dom';

const ShowroomPage: React.FC = () => {
  const { t } = useLang();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="relative bg-[#2E4033] text-white pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-light mb-3 text-white">
                {t('showroom.title')}
              </h1>
              <p className="text-lg text-[#C97A53] font-light max-w-2xl">
                {t('showroom.subtitle')}
              </p>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 text-[#C97A53] hover:text-white transition-colors border border-[#C97A53] hover:border-white px-6 py-3 rounded-full text-sm"
            >
              <span>{t('showroom.backHome')}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-8">
        <Showroom />
      </div>

  

      

      <div className="bg-[#2E4033] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-4 text-white">
            {t('showroom.ctaTitle')}
          </h2>
          <p className="text-[#C97A53] max-w-2xl mx-auto mb-6">
            {t('showroom.ctaText')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#C97A53] text-white px-8 py-3 rounded-full hover:bg-[#b86a45] transition-colors"
          >
            <span>{t('showroom.contactUs')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowroomPage;