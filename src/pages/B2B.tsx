import React from 'react';
import B2BHero from './b2b/B2BHero';
import B2BFeatures from './b2b/B2BFeatures';
import B2BForm from './b2b/B2BForm';

const B2B: React.FC = () => {
  return (
    <div className="relative">
      <B2BHero />
      <B2BFeatures />
      <B2BForm />
    </div>
  );
};

export default B2B;
