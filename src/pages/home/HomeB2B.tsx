import React from 'react';
import { useLang } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MessageCircle } from 'lucide-react';

const HomeB2B: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
          alt={t('home.b2b.alt')}
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-[#2E4033]/65" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2E4033]/90 via-[#2E4033]/65 to-[#2E4033]/30" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C97A53]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#E0A17F]">
                {t('home.b2b.label')}
              </span>
            </div>

            <h2 className="font-serif text-4xl font-light leading-[1.1] text-white sm:text-5xl lg:text-6xl">
              {t('home.b2b.title')}
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base md:text-lg">
              {t('home.b2b.subtitle')}
            </p>

            <div className="mt-8">
              <Link
                to="/b2b"
                className="group inline-flex items-center gap-3 rounded-full bg-[#C97A53] px-6 py-3.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B86A45] hover:shadow-xl sm:px-7 sm:py-4"
              >
                <span>{t('home.b2b.cta')}</span>
                <ArrowRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:pl-10">
            <div className="rounded-2xl sm:p-8">
              <h3 className="font-serif text-xl font-light text-white sm:text-2xl">
                {t('home.b2b.contact.title')}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {t('home.b2b.contact.desc')}
              </p>

              <div className="mt-7 space-y-5">
                <a href="tel:+261347640116" className="group flex items-center gap-4 text-sm text-white/75 transition-colors hover:text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Phone size={16} strokeWidth={1.6} className="text-[#C97A53]" />
                  </span>
                  <span>{t('home.b2b.contact.phoneLabel')} : +261 34 76 401 16</span>
                </a>

                <a href="mailto:contact@natureraphia-mahalia.mg" className="group flex items-center gap-4 text-sm text-white/75 transition-colors hover:text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Mail size={16} strokeWidth={1.6} className="text-[#C97A53]" />
                  </span>
                  <span className="break-all">{t('home.b2b.contact.emailLabel')} : contact@natureraphia-mahalia.mg</span>
                </a>

                <a href="https://wa.me/261347640116" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-sm text-white/75 transition-colors hover:text-white">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <MessageCircle size={16} strokeWidth={1.6} className="text-[#25D366]" />
                  </span>
                  <span>{t('home.b2b.contact.whatsapp')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeB2B;
