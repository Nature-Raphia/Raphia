import React from 'react';
import { ArrowRight, MapPin, Phone, Mail, Heart, Star, ShoppingBag, Check, Sparkles, MessageCircle, Building2 } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Showroom from '../components/Showroom';
import Atelier from '../components/Atelier';
import RSE from '../components/RSE';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  const { t } = useLang();

  return (
    <div>
      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== COLLECTION SIGNATURE ===== */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              Collection Signature
              <span className="w-8 h-px bg-[#C97A53]" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
              {t('home.featured.title')}
            </h2>
            <p className="text-sm text-[#2E4033]/50 max-w-2xl mx-auto">
              {t('showroom.subtitle')}
            </p>
          </div>

          <Showroom />

          <div className="text-center mt-12">
            <Link
              to="/showroom"
              className="group inline-flex items-center gap-2 border-2 border-[#2E4033] text-[#2E4033] px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:bg-[#2E4033] hover:text-white"
            >
              {t('showroom.viewall')}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NOS ENGAGEMENTS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              {t('rse.label')}
              <span className="w-8 h-px bg-[#C97A53]" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
              {t('rse.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Leaf, titleKey: 'rse.card1.title', descKey: 'rse.card1.desc', color: '#C97A53' },
              { icon: Heart, titleKey: 'rse.card2.title', descKey: 'rse.card2.desc', color: '#2E4033' },
              { icon: Users, titleKey: 'rse.card3.title', descKey: 'rse.card3.desc', color: '#C97A53' },
              { icon: Sparkles, titleKey: 'rse.card4.title', descKey: 'rse.card4.desc', color: '#2E4033' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-[#FAF7F2] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: item.color + '12' }}>
                    <Icon size={24} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#2E4033] mb-3">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-[#2E4033]/50 leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== L'ATELIER ===== */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://earthy-artisanal-boutique.lovable.app/assets/atelier-hands-BzOj_YfA.jpg"
                alt="Artisan hands crocheting raphia"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
                <span className="w-8 h-px bg-[#C97A53]" />
                {t('atelier.label')}
                <span className="w-8 h-px bg-[#C97A53]" />
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-6">
                {t('atelier.title')}
              </h2>
              <p className="text-[#2E4033]/60 leading-relaxed mb-8">
                {t('atelier.subtitle')}
              </p>
              <Link
                to="/atelier"
                className="inline-flex items-center gap-2 bg-[#2E4033] hover:bg-[#C97A53] text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:shadow-xl"
              >
                {t('atelier.cta')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DANS L'ATELIER ===== */}
      <section className="py-24 bg-white">
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
              { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/a545435e-6266-4855-91d9-18152e530bbc/atelier-collage.jpg', alt: 'Atelier workshop', span: 'row-span-2 aspect-[4/5]' },
              { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/9a27bdf5-a1ac-47f5-896d-527ec44fffda/showroom-bags.jpg', alt: 'Woven bags', span: 'aspect-square' },
              { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/0260cb67-235d-49a4-affe-87906e192c32/epices.jpg', alt: 'Spices', span: 'aspect-square' },
              { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/74db990f-ea42-4b4f-9d24-654769dfcb22/mahalia-boutique.jpg', alt: 'Mahalia boutique', span: 'aspect-square' },
              { src: 'https://earthy-artisanal-boutique.lovable.app/__l5e/assets-v1/05281394-da6f-4c1c-bfde-7053394230c4/showroom-decor.jpg', alt: 'Home decor', span: 'aspect-square' },
            ].map((img, i) => (
              <div key={i} className={`relative overflow-hidden rounded-2xl ${img.span}`}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ILS NOUS FONT CONFIANCE ===== */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              {t('testimonials.title')}
              <span className="w-8 h-px bg-[#C97A53]" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
              {t('testimonials.subtitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "Une qualité de tissage rare et des finitions qui subliment chaque saison de notre concept-store.", name: "Camille R.", role: "Concept-store, Paris" },
              { quote: "Nature Raphia est devenu un partenaire essentiel de notre sélection été. L'authenticité se ressent dès la première pièce.", name: "Sofia L.", role: "Boutique d'hôtel, Milan" },
              { quote: "Chaque commande arrive impeccable. Nos clientes tombent amoureuses des chapeaux dès qu'elles les touchent.", name: "Elena M.", role: "E-shop mode, Barcelone" },
              { quote: "Un travail éthique et une histoire humaine forte — exactement ce que nos clients recherchent aujourd'hui.", name: "Marc D.", role: "Boutique déco, Bruxelles" },
            ].map((testimonial, i) => (
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

      {/* ===== ESPACE PROFESSIONNEL ===== */}
      <section className="py-24 bg-[#2E4033] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C97A53]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E6DFD3]/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Building2 size={40} className="text-[#C97A53] mb-6" />
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6">
                Vous êtes un professionnel ?
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Concept-stores, boutiques hôtelières, e-shops : découvrez notre programme grossiste, nos éditions exclusives et notre accompagnement dédié.
              </p>
              <Link
                to="/b2b"
                className="inline-flex items-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-[#C97A53]/40"
              >
                Accéder à l'Espace B2B
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h3 className="font-serif text-xl text-white mb-4">Contactez notre équipe</h3>
              <p className="text-white/50 text-sm mb-6">Pour toute demande professionnelle, nous répondons sous 24h.</p>
              <div className="space-y-4">
                <a href="tel:+261347640116" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Phone size={18} className="text-[#C97A53]" />
                  <span>+261 34 76 401 16</span>
                </a>
                <a href="mailto:contact@natureraphia-mahalia.mg" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <Mail size={18} className="text-[#C97A53]" />
                  <span>contact@natureraphia-mahalia.mg</span>
                </a>
                <a href="https://wa.me/261347640116" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span>WhatsApp B2B</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

  
    </div>
  );
};

// Icons used inline
const Leaf = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1a7 7 0 0 1 11.9 4.9"/><path d="M12 20V10"/><path d="M7 13a5 5 0 0 0 10 0"/></svg>
);
const Users = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const Sparkles = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);
const Heart = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const Building2 = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/></svg>
);

export default Home;