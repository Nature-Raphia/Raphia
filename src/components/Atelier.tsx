import React, { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';

const steps = [
  {
    num: '01',
    titleKey: 'atelier.step1.title',
    descKey: 'atelier.step1.desc',
    icon: '🌴',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    color: '#C97A53',
  },
  {
    num: '02',
    titleKey: 'atelier.step2.title',
    descKey: 'atelier.step2.desc',
    icon: '✋',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    color: '#2E4033',
  },
  {
    num: '03',
    titleKey: 'atelier.step3.title',
    descKey: 'atelier.step3.desc',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1584680226833-0d8d4a2b9452?w=400&q=80',
    color: '#4a6741',
  },
  {
    num: '04',
    titleKey: 'atelier.step4.title',
    descKey: 'atelier.step4.desc',
    icon: '🧶',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80',
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

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms`, flexDirection: isEven ? 'row' : 'row-reverse' }}
    >
      {/* Image */}
      <div className="flex-1 rounded-2xl overflow-hidden shadow-lg group">
        <img
          src={step.image}
          alt={t(step.titleKey)}
          className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ backgroundColor: step.color + '20', border: `2px solid ${step.color}` }}>
            {step.icon}
          </div>
          <span className="font-serif text-6xl font-bold text-[#E6DFD3]">{step.num}</span>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-[#2E4033]">{t(step.titleKey)}</h3>
        <p className="text-[#2E4033]/70 leading-relaxed">{t(step.descKey)}</p>
        <div className="w-12 h-0.5 rounded" style={{ backgroundColor: step.color }} />
      </div>
    </div>
  );
};

const Atelier: React.FC = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="atelier" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('atelier.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
            {t('atelier.title')}
          </h2>
          <p className="text-[#2E4033]/70 max-w-2xl mx-auto leading-relaxed">
            {t('atelier.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* Gallery strip */}
        <div className="mt-20 grid grid-cols-4 gap-3 rounded-2xl overflow-hidden">
          {[
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80',
            'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80',
            'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
            'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=400&q=80',
          ].map((src, i) => (
            <div key={i} className="relative overflow-hidden aspect-square group">
              <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#2E4033]/0 group-hover:bg-[#2E4033]/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Atelier;
