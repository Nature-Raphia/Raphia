import React from 'react';
import { useLang } from '../../contexts/LanguageContext';

const HomeGallery: React.FC = () => {
  const { t } = useLang();

  const images = [
    { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/a545435e-6266-4855-91d9-18152e530bbc/atelier-collage.jpg', alt: 'Atelier workshop', span: 'row-span-2 aspect-[4/5]' },
    { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/9a27bdf5-a1ac-47f5-896d-527ec44fffda/showroom-bags.jpg', alt: 'Woven bags', span: 'aspect-square' },
    { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/0260cb67-235d-49a4-affe-87906e192c32/epices.jpg', alt: 'Spices', span: 'aspect-square' },
    { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/74db990f-ea42-4b4f-9d24-654769dfcb22/mahalia-boutique.jpg', alt: 'Mahalia boutique', span: 'aspect-square' },
    { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/05281394-da6f-4c1c-bfde-7053394230c4/showroom-decor.jpg', alt: 'Home decor', span: 'aspect-square' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('home.gallery.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl  text-[#2E4033] mb-4">
            {t('home.gallery.title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl ${img.span}`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
