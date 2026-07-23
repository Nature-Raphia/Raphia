import React, { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Leaf, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: '01',
    titleKey: 'atelier.step1.title',
    descKey: 'atelier.step1.desc',

    image: '/recolte.jpg',
    color: '#C97A53',
  },
  {
    num: '02',
    titleKey: 'atelier.step2.title',
    descKey: 'atelier.step2.desc',
   
    image: '/peignage.jpg',
    color: '#2E4033',
  },
  {
    num: '03',
    titleKey: 'atelier.step3.title',
    descKey: 'atelier.step3.desc',
   
    image: '/1.jpg',
    color: '#4a6741',
  },
  {
    num: '04',
    titleKey: 'atelier.step4.title',
    descKey: 'atelier.step4.desc',
    
    image: 'crochage.jpg',
    color: '#C97A53',
  },
];

const StepCard: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-6 lg:gap-10 transition-all duration-700 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image - taille réduite */}
      <div className="flex-shrink-0 w-full md:w-48 lg:w-56">
        <div className="relative rounded-2xl overflow-hidden shadow-lg group aspect-square">
          <img
            src={step.image}
            alt={t(step.titleKey)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E4033]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-2 left-2">
            <span 
              className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#2E4033] px-2.5 py-1 rounded-full text-[10px] font-medium"
            >
             
              <span>{step.num}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Contenu - prend le reste de l'espace */}
      <div className="flex-1 flex flex-col justify-center space-y-3">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
            style={{ 
              backgroundColor: step.color + '15',
              border: `1.5px solid ${step.color}`,
            }}
          >
           
          </div>
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: step.color }}>
            Étape {step.num}
          </span>
        </div>
        
        <h3 className="font-serif text-xl lg:text-2xl font-semibold text-[#2E4033] leading-tight">
          {t(step.titleKey)}
        </h3>
        
        <p className="text-[#2E4033]/70 leading-relaxed text-sm lg:text-base max-w-lg">
          {t(step.descKey)}
        </p>
        
        <div className="flex items-center gap-3 pt-1">
          <div className="w-10 h-0.5 rounded-full" style={{ backgroundColor: step.color }} />
          <span className="text-xs text-[#2E4033]/30 font-light">0{index + 1}/04</span>
        </div>
      </div>
    </div>
  );
};

const Atelier: React.FC = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); } 
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="atelier" className="py-20 bg-[#FAF7F2] relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C97A53]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2E4033]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div 
          ref={ref} 
          className={`mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#C97A53]" />
              <span className="text-xs font-medium text-[#C97A53] uppercase tracking-[0.2em]">
                {t('atelier.label')}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#2E4033] mb-3 leading-tight">
              {t('atelier.title')}
            </h2>
            <p className="text-[#2E4033]/70 leading-relaxed text-sm lg:text-base">
              {t('atelier.subtitle')}
            </p>
          </div>
        </div>

        {/* Steps - alignement horizontal parfait */}
        <div className="space-y-12 lg:space-y-14">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* Gallery simplifiée */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-serif text-lg font-semibold text-[#2E4033]">Galerie</h3>
            <div className="flex-1 h-px bg-[#2E4033]/10" />
            <Leaf size={16} className="text-[#C97A53]" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
            {[
              'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80',
              'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80',
              'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
              'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=400&q=80',
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden aspect-square group cursor-pointer">
                <img 
                  src={src} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-[#2E4033]/0 group-hover:bg-[#2E4033]/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atelier;