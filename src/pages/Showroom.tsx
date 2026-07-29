import React from 'react';
import { useLang } from '../contexts/LanguageContext';
import Showroom from '../components/Showroom';
import ShowroomHero from './showroom/ShowroomHero';
import ShowroomCTA from './showroom/ShowroomCTA';

const ShowroomPage: React.FC = () => {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <ShowroomHero />
      <section className="py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="px-4 sm:px-6 lg:px-10">
          <Showroom />
        </div>
      </section>
      <ShowroomCTA />
    </div>
  );
};

export default ShowroomPage;
