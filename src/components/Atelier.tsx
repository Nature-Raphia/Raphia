import React, { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { Leaf, ArrowRight, Play, Calendar, Clock } from 'lucide-react';

const steps = [
  {
    titleKey: 'atelier.step1.title',
    descKey: 'atelier.step1.desc',
    image: '/recolte.jpg',
    color: '#C97A53',
    duration: '2-3 jours',
    season: 'Printemps - Été'
  },
  {
    titleKey: 'atelier.step2.title',
    descKey: 'atelier.step2.desc',
    image: '/peignage.jpg',
    color: '#2E4033',
    duration: '1-2 jours',
    season: 'Toute l\'année'
  },
  {
    titleKey: 'atelier.step3.title',
    descKey: 'atelier.step3.desc',
    image: '/1.jpg',
    color: '#4a6741',
    duration: '3-5 jours',
    season: 'Automne - Hiver'
  },
  {
    titleKey: 'atelier.step4.title',
    descKey: 'atelier.step4.desc',
    image: '/crochage.jpg',
    color: '#C97A53',
    duration: '5-7 jours',
    season: 'Toute l\'année'
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

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image - Style Airbnb avec overlay */}
      <div className="flex-shrink-0 w-full md:w-1/2 lg:w-5/12">
        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
          <div className="aspect-[4/3] w-full">
            <img
              src={step.image}
              alt={t(step.titleKey)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Badge étape - sans numéro */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[#2E4033] px-4 py-1.5 rounded-full text-xs font-medium shadow-lg">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: step.color }} />
              {t(step.titleKey)}
            </span>
          </div>

          {/* Durée et saison */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-[10px] font-medium">
              <Clock size={12} />
              {step.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white/90 px-3 py-1.5 rounded-full text-[10px] font-medium">
              <Calendar size={12} />
              {step.season}
            </span>
          </div>
        </div>
      </div>

      {/* Contenu - Style Airbnb */}
      <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-5">
        {/* Ligne décorative */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#2E4033]/10" />
        </div>
        
        <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#2E4033] leading-tight">
          {t(step.titleKey)}
        </h3>
        
        <p className="text-[#2E4033]/70 leading-relaxed text-sm lg:text-base max-w-lg">
          {t(step.descKey)}
        </p>
        
        {/* Tags d'information */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#2E4033] border border-[#E6DFD3]">
            <Clock size={14} className="text-[#C97A53]" />
            {step.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-xs font-medium text-[#2E4033] border border-[#E6DFD3]">
            <Calendar size={14} className="text-[#C97A53]" />
            {step.season}
          </span>
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
    <section id="atelier" className="py-16 bg-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C97A53]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E4033]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header - Style Airbnb */}
        <div 
          ref={ref} 
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-0.5 bg-[#C97A53]" />
                <span className="text-xs font-medium text-[#C97A53] uppercase tracking-[0.2em]">
                  {t('atelier.label')}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2E4033] mb-4 leading-tight">
                {t('atelier.title')}
              </h2>
              <p className="text-[#2E4033]/60 text-sm lg:text-base max-w-xl">
                {t('atelier.subtitle')}
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 text-sm text-[#2E4033]/40">
                <span className="font-medium text-[#C97A53]">04</span>
                <span>étapes</span>
                <span className="w-px h-4 bg-[#E6DFD3]" />
                <span>artisanat</span>
                <span className="w-px h-4 bg-[#E6DFD3]" />
                <span>tradition</span>
              </div>
            </div>
          </div>
        </div>

        {/* Steps - Sans numérotation */}
        <div className="space-y-16 lg:space-y-20">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* Gallery - Style Airbnb */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#2E4033]">Galerie</h3>
              <p className="text-sm text-[#2E4033]/50">Découvrez notre processus artisanal</p>
            </div>
            <button className="text-sm font-medium text-[#C97A53] hover:text-[#a8623e] transition-colors">
              Voir tout
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80',
              'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80',
              'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
              'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=400&q=80',
            ].map((src, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer">
                <img 
                  src={src} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-white text-xs font-medium">Voir plus</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action - Style Airbnb */}
        <div className="mt-16 bg-[#2E4033] rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C97A53]/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Prêt à découvrir notre artisanat ?
              </h3>
              <p className="text-white/70 text-sm mt-1">
                Plongez dans l'univers de la création artisanale
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-[#C97A53] hover:bg-[#a8623e] text-white rounded-full font-medium transition-colors shadow-lg shadow-[#C97A53]/20">
              <Play size={18} />
              Découvrir l'atelier
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Atelier;