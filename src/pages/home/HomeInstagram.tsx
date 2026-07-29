import React from 'react';
import { useLang } from '../../contexts/LanguageContext';
import InstagramFeed from '../../components/InstagramFeed';

const HomeInstagram: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="bg-[#FAF7F2] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <InstagramFeed
          username="nature.raphia"
          limit={6}
          title="@nature.raphia"
        />
      </div>
    </section>
  );
};

export default HomeInstagram;
