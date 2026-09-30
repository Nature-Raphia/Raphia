import React from 'react';

// Vidéo servie depuis public/ : Google Drive refuse la lecture dans une balise <video> d'un autre site (403).
// Source : https://drive.google.com/file/d/1uhXHiiMpAoJ61u3x1NOf180z_R0uQo6S/view
const VIDEO_URL = '/hero.mp4';

const Hero: React.FC = () => {
  return (
    <section className="relative isolate h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
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
