import React from 'react';
import Atelier from '../components/Atelier';
import AtelierImpact from './atelier/AtelierImpact';

const AtelierPage: React.FC = () => {
  return (
    <div className="pt-16 md:pt-20">
      <Atelier />
      <AtelierImpact />
    </div>
  );
};

export default AtelierPage;
