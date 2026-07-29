import React from 'react';
import HomeHero from './home/HomeHero';
import HomeCollection from './home/HomeCollection';
import HomeEngagements from './home/HomeEngagements';
import HomeAtelier from './home/HomeAtelier';
import HomeGallery from './home/HomeGallery';
import HomeTestimonials from './home/HomeTestimonials';
import HomeInstagram from './home/HomeInstagram';
import HomeB2B from './home/HomeB2B';

const Home: React.FC = () => {
  return (
    <div>
      <HomeHero />
      <HomeCollection />
      <HomeEngagements />
      <HomeAtelier />
      <HomeGallery />
      <HomeTestimonials />
      <HomeInstagram />
      <HomeB2B />
    </div>
  );
};

export default Home;
