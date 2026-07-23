import React, { useRef, useEffect, useState } from 'react';
import { Leaf, Hand, Heart, Droplets } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const commitments = [
  { icon: Leaf, titleKey: 'rse.card1.title', descKey: 'rse.card1.desc', color: '#2E4033' },
  { icon: Hand, titleKey: 'rse.card2.title', descKey: 'rse.card2.desc', color: '#C97A53' },
  { icon: Heart, titleKey: 'rse.card3.title', descKey: 'rse.card3.desc', color: '#2E4033' },
  { icon: Droplets, titleKey: 'rse.card4.title', descKey: 'rse.card4.desc', color: '#C97A53' },
];

const RSE: React.FC = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="engagements" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('rse.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
            {t('rse.title')}
          </h2>
        </div>

        {/* Commitments grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: item.color + '15' }}
                >
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="font-serif font-semibold text-[#2E4033] mb-2">{t(item.titleKey)}</h3>
                <p className="text-sm text-[#2E4033]/65 leading-relaxed">{t(item.descKey)}</p>
              </div>
            );
          })}
        </div>

        {/* Women artisans section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] row-span-2">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"
                alt="Artisane Nature Raphia"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img
                src="https://images.unsplash.com/photo-1584680226833-0d8d4a2b9452?w=400&q=80"
                alt="Teinture végétale"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-square">
              <img
                src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80"
                alt="Création raphia"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="w-12 h-1 bg-[#C97A53] rounded mb-6" />
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#2E4033] mb-4">
              {t('rse.women.title')}
            </h3>
            <p className="text-[#2E4033]/70 leading-relaxed mb-8">
              {t('rse.women.desc')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '40+', label: { fr: 'Artisanes', en: 'Artisans' } },
                { num: '12', label: { fr: 'Ans', en: 'Years' } },
                { num: '0%', label: { fr: 'Chimique', en: 'Chemical' } },
              ].map((s, i) => (
                <div key={i} className="text-center p-3 bg-[#E6DFD3]/50 rounded-xl">
                  <div className="font-serif text-2xl font-semibold text-[#C97A53]">{s.num}</div>
                  <div className="text-xs text-[#2E4033]/60 mt-1">{s.label.fr}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="font-serif text-2xl font-semibold text-[#2E4033]">{t('testimonials.title')}</h3>
            <p className="text-[#2E4033]/60 mt-1">{t('testimonials.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { quote: { fr: '"Une qualité de tissage rare et des finitions qui subliment chaque saison de notre concept-store."', en: '"A rare weaving quality and finishes that elevate every season at our concept store."' }, author: 'Camille R.', location: 'Concept-store, Paris' },
              { quote: { fr: '"Nature Raphia est devenu un partenaire essentiel de notre sélection été."', en: '"Nature Raphia has become an essential partner for our summer selection."' }, author: 'Sofia L.', location: 'Boutique d\'hôtel, Milan' },
              { quote: { fr: '"Nos clientes tombent amoureuses des chapeaux dès qu\'elles les touchent."', en: '"Our customers fall in love with the hats the moment they touch them."' }, author: 'Elena M.', location: 'E-shop mode, Barcelone' },
              { quote: { fr: '"Un travail éthique et une histoire humaine forte — exactement ce que nos clients recherchent."', en: '"Ethical work and a strong human story — exactly what our customers seek."' }, author: 'Marc D.', location: 'Boutique déco, Bruxelles' },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#C97A53] text-3xl font-serif mb-3">"</div>
                <p className="text-sm text-[#2E4033]/75 leading-relaxed italic mb-4">{testimonial.quote.fr}</p>
                <div className="border-t border-[#E6DFD3] pt-3">
                  <div className="font-semibold text-[#2E4033] text-sm">{testimonial.author}</div>
                  <div className="text-xs text-[#2E4033]/50">{testimonial.location}</div>
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
