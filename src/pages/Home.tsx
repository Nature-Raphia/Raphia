import React from 'react';
import Hero from '../components/Hero';
import Showroom from '../components/Showroom';
import Atelier from '../components/Atelier';
import RSE from '../components/RSE';
import Contact from '../components/Contact';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, MessageCircle, MapPin, Phone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLang();

  return (
    <div>
      <Hero />

      <section className="text-center py-2 md:py-12 bg-[#FFF]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="w-16 h-0.5 bg-[#C97A53] mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2E4033]">
            {t('home.featured.label')}
          </h2>
          <p className="text-sm md:text-base text-[#2E4033]/60 mt-3 max-w-2xl mx-auto">
            {t('home.featured.subtitle')}
          </p>
        </div>
      </section>

      <Showroom />
      <RSE />
      <Atelier />

      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              {t('home.gallery.label')}
              <span className="w-8 h-px bg-[#C97A53]" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
              {t('home.gallery.title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: '/recolte.jpg', altKey: 'home.gallery.alt.recolte' },
              { src: '/peignage.jpg', altKey: 'home.gallery.alt.peignage' },
              { src: '/crochage.jpg', altKey: 'home.gallery.alt.crochage' },
              { src: '/1.jpg', altKey: 'home.gallery.alt.creation' },
              { src: '/nature.jpg', altKey: 'home.gallery.alt.nature' },
              { src: '/vegetal.jpg', altKey: 'home.gallery.alt.teinture' },
            ].map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'row-span-2 aspect-[4/5]' : 'aspect-square'}`}>
                <img src={img.src} alt={t(img.altKey)} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;