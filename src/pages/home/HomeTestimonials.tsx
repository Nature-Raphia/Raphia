import React from 'react';
import { Star } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const HomeTestimonials: React.FC = () => {
  const { t } = useLang();

  const testimonials = [
    { quote: "Une qualité de tissage rare et des finitions qui subliment chaque saison de notre concept-store.", name: "Camille R.", role: "Concept-store, Paris" },
    { quote: "Nature Raphia est devenu un partenaire essentiel de notre sélection été. L'authenticité se ressent dès la première pièce.", name: "Sofia L.", role: "Boutique d'hôtel, Milan" },
    { quote: "Chaque commande arrive impeccable. Nos clientes tombent amoureuses des chapeaux dès qu'elles les touchent.", name: "Elena M.", role: "E-shop mode, Barcelone" },
    { quote: "Un travail éthique et une histoire humaine forte — exactement ce que nos clients recherchent aujourd'hui.", name: "Marc D.", role: "Boutique déco, Bruxelles" },
  ];

  return (
    <section className=" bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('testimonials.title')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl  text-[#2E4033] mb-4">
            {t('testimonials.subtitle')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-[#E6DFD3]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-[#C97A53] text-[#C97A53]" />
                ))}
              </div>
              <p className="text-[#2E4033]/70 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C97A53]/10 flex items-center justify-center">
                  <span className="text-[#C97A53] font-serif font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#2E4033]">{testimonial.name}</div>
                  <div className="text-xs text-[#2E4033]/40">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
