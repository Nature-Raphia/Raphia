import React, { useRef, useEffect, useState } from 'react';
import { Leaf, Hand, Heart, Droplets, Quote, Users, Award, Clock, Sparkles } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const commitments = [
  {
    icon: Leaf,
    titleKey: 'rse.card1.title',
    descKey: 'rse.card1.desc',
    color: '#2E4033',
    gradient: 'from-[#2E4033]/5 to-[#2E4033]/10'
  },
  {
    icon: Hand,
    titleKey: 'rse.card2.title',
    descKey: 'rse.card2.desc',
    color: '#C97A53',
    gradient: 'from-[#C97A53]/5 to-[#C97A53]/10'
  },
  {
    icon: Heart,
    titleKey: 'rse.card3.title',
    descKey: 'rse.card3.desc',
    color: '#2E4033',
    gradient: 'from-[#2E4033]/5 to-[#2E4033]/10'
  },
  {
    icon: Droplets,
    titleKey: 'rse.card4.title',
    descKey: 'rse.card4.desc',
    color: '#C97A53',
    gradient: 'from-[#C97A53]/5 to-[#C97A53]/10'
  },
];

const RSE: React.FC = () => {
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
    <section id="engagements" className="py-24 bg-gradient-to-b from-[#FAF7F2] to-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#C97A53]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#2E4033]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E6DFD3]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header - Design plus raffiné */}
        <div ref={ref} className={`text-center mb-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="w-12 h-px bg-[#C97A53]" />
            <span className="text-xs font-light text-[#C97A53] uppercase tracking-[0.3em]">
              {t('rse.label')}
            </span>
            <span className="w-12 h-px bg-[#C97A53]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#2E4033] mb-4">
            {t('rse.title')}
          </h2>
          <div className="w-16 h-0.5 bg-[#C97A53]/40 mx-auto" />
        </div>

        {/* Commitments grid - Design épuré avec effet de carte premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`group relative bg-white rounded-3xl p-8 transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{
                  transitionDelay: `${i * 100 + 200}ms`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
                }}
              >
                {/* Background gradient subtle */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon avec cercle élégant */}
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      backgroundColor: item.color + '12',
                      border: `1px solid ${item.color}20`
                    }}
                  >
                    <Icon size={24} style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#2E4033] mb-3 group-hover:text-[#C97A53] transition-colors duration-300">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-[#2E4033]/60 leading-relaxed">
                  {t(item.descKey)}
                </p>

                {/* Ligne décorative */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            );
          })}
        </div>

        {/* Women artisans section - Design luxueux */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          {/* Images avec disposition artistique */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] row-span-2 shadow-xl">
                <img
                  src="/nature.jpg"  // Ajoutez le slash au début
                  alt="Artisane Nature Raphia"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square shadow-lg">
                <img
                  src="/vegetal.jpg"  // Ajoutez le slash au début
                  alt="Teinture végétale"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square shadow-lg relative">
                <img
                  src="/1.jpg"
                  alt="Création raphia"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E4033]/20 to-transparent" />
              </div>
            </div>

            {/* Badge flottant */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-2xl p-4 backdrop-blur-sm border border-white/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C97A53]/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-[#C97A53]" />
                </div>
                <div>
                  <div className="text-xs font-medium text-[#2E4033]">Artisanat d'exception</div>
                  <div className="text-[10px] text-[#2E4033]/50">Savoir-faire unique</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text avec plus de caractère */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-[#C97A53]" />
              <span className="text-xs font-light text-[#C97A53] uppercase tracking-[0.2em]">
                {t('rse.women.label') || 'Artisanat'}
              </span>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#2E4033] mb-4 leading-tight">
              {t('rse.women.title')}
            </h3>

            <p className="text-[#2E4033]/60 leading-relaxed mb-10 text-base">
              {t('rse.women.desc')}
            </p>

            {/* Stats avec design raffiné */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '40+', label: { fr: 'Artisanes', en: 'Artisans' }, icon: Users },
                { num: '12', label: { fr: "Ans d'expertise", en: 'Years' }, icon: Award },
                { num: '0%', label: { fr: 'Chimique', en: 'Chemical' }, icon: Leaf },
              ].map((s, i) => {
                const StatIcon = s.icon;
                return (
                  <div key={i} className="group text-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#C97A53]/5 flex items-center justify-center group-hover:bg-[#C97A53]/10 transition-colors">
                        <StatIcon size={14} className="text-[#C97A53]" />
                      </div>
                    </div>
                    <div className="font-serif text-2xl font-light text-[#C97A53]">{s.num}</div>
                    <div className="text-[10px] text-[#2E4033]/50 uppercase tracking-wider mt-1">{s.label.fr}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Testimonials - Design plus épuré et élégant */}
        <div>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              <span className="text-xs font-light text-[#C97A53] uppercase tracking-[0.2em]">
                {t('testimonials.label') || 'Témoignages'}
              </span>
              <span className="w-8 h-px bg-[#C97A53]" />
            </div>
            <h3 className="font-serif text-3xl font-light text-[#2E4033]">
              {t('testimonials.title')}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                quote: { fr: '"Une qualité de tissage rare et des finitions qui subliment chaque saison de notre concept-store."', en: '"A rare weaving quality and finishes that elevate every season at our concept store."' },
                author: 'Camille R.',
                location: 'Concept-store, Paris',
                color: '#C97A53'
              },
              {
                quote: { fr: '"Nature Raphia est devenu un partenaire essentiel de notre sélection été."', en: '"Nature Raphia has become an essential partner for our summer selection."' },
                author: 'Sofia L.',
                location: 'Boutique d\'hôtel, Milan',
                color: '#2E4033'
              },
              {
                quote: { fr: '"Nos clientes tombent amoureuses des chapeaux dès qu\'elles les touchent."', en: '"Our customers fall in love with the hats the moment they touch them."' },
                author: 'Elena M.',
                location: 'E-shop mode, Barcelone',
                color: '#C97A53'
              },
              {
                quote: { fr: '"Un travail éthique et une histoire humaine forte — exactement ce que nos clients recherchent."', en: '"Ethical work and a strong human story — exactly what our customers seek."' },
                author: 'Marc D.',
                location: 'Boutique déco, Bruxelles',
                color: '#2E4033'
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Accent color line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-500 group-hover:h-1.5"
                  style={{ backgroundColor: testimonial.color }}
                />

                <div className="pt-4">
                  <Quote size={20} className="text-[#C97A53]/30 mb-3" strokeWidth={1.5} />
                  <p className="text-sm text-[#2E4033]/70 leading-relaxed italic mb-4">
                    {testimonial.quote.fr}
                  </p>
                  <div className="border-t border-[#E6DFD3] pt-3">
                    <div className="font-serif font-medium text-[#2E4033] text-sm">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-[#2E4033]/40 mt-0.5">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSE;