import React from 'react';

// Image de fond servie depuis public/
const IMAGE_URL = '/fond.jpeg';

const Hero: React.FC = () => {
  return (
    <section className="relative isolate h-screen w-full overflow-hidden bg-black">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={IMAGE_URL}
        alt=""
        aria-hidden="true"
      />
    </section>
  );
};

export default Hero;
