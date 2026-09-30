import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative isolate h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/FONDATION%20DEMAIN.mp4"
        poster="https://earthy-artisanal-boutique.lovable.app/assets/hero-raphia-Bku4jKb_.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
