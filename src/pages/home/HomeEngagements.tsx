import React from 'react';
import { useLang } from '../../contexts/LanguageContext';
import RSE from '../../components/RSE';

const HomeEngagements: React.FC = () => {
  const { t } = useLang();

  return (
    <section className=" bg-white">
    
        <RSE />
    
    </section>
  );
};

export default HomeEngagements;
