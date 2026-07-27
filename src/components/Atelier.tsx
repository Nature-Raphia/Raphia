import React, { useRef, useEffect, useState } from 'react';
import { useLang } from '../contexts/LanguageContext';
import { ArrowRight, Award, Clock, Leaf, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    titleKey: 'story.step1.title',
    descKey: 'story.step1.desc',
    image: 'https://earthy-artisanal-boutique.lovable.app/assets/atelier-hands-BzOj_YfA.jpg',
  },
  {
    number: '02',
    titleKey: 'story.step2.title',
    descKey: 'story.step2.desc',
    image: 'https://earthy-artisanal-boutique.lovable.app/assets/dyed-raphia-BEQA-rXp.jpg',
  },
  {
    number: '03',
    titleKey: 'story.step3.title',
    descKey: 'story.step3.desc',
    image: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/a545435e-6266-4855-91d9-18152e530bbc/atelier-collage.jpg',
  },
  {
    number: '04',
    titleKey: 'story.step4.title',
    descKey: 'story.step4.desc',
    image: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/9a27bdf5-a1ac-47f5-896d-527ec44fffda/showroom-bags.jpg',
  },
];

const impactStats = [
  { icon: Users, number: '40+', labelKey: 'story.stat1' },
  { icon: Leaf, number: '100%', labelKey: 'story.stat2' },
  { icon: Clock, number: '0', labelKey: 'story.stat3' },
  { icon: Award, number: '12', labelKey: 'story.stat4' },
];

const StepCard: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="flex-shrink-0 w-full md:w-1/2 lg:w-5/12">
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <div className="aspect-[4/3] w-full">
            <img
              src={step.image}
              alt={t(step.titleKey)}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Numbered badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-[#2E4033] px-4 py-1.5 rounded-full text-xs font-medium shadow-lg">
              {step.number}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-[#2E4033] leading-tight">
          {t(step.titleKey)}
        </h3>
        <p className="text-[#2E4033]/60 leading-relaxed text-sm lg:text-base max-w-lg">
          {t(step.descKey)}
        </p>
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
    <section id="atelier" className="py-16 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C97A53]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2E4033]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            Nature Raphia · L'Atelier
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#2E4033] mb-6 leading-tight">
            {t('story.title')}
          </h2>
          <p className="text-[#2E4033]/60 text-base lg:text-lg max-w-2xl leading-relaxed mb-8">
            {t('story.subtitle')}
          </p>
       
        </div>

        {/* Steps */}
        <div className="space-y-16 lg:space-y-20">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* Impact Stats */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              {t('story.impact.label')}
              <span className="w-8 h-px bg-[#C97A53]" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
              {t('story.impact.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center bg-white rounded-2xl p-8 shadow-sm border border-[#E6DFD3]">
                  <div className="w-14 h-14 rounded-2xl bg-[#C97A53]/10 flex items-center justify-center mx-auto mb-5">
                    <Icon size={24} className="text-[#C97A53]" />
                  </div>
                  <div className="font-serif text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm text-[#2E4033]/50 leading-relaxed">
                    {t(stat.labelKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

   

      </div>
    </section>
  );
};

export default Atelier;