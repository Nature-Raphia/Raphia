import React from 'react';
import { BadgeCheck, Users, Truck, Building2 } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';

const features = [
  { icon: BadgeCheck, titleKey: 'b2b.feature1.title', descKey: 'b2b.feature1.desc' },
  { icon: Users, titleKey: 'b2b.feature2.title', descKey: 'b2b.feature2.desc' },
  { icon: Truck, titleKey: 'b2b.feature3.title', descKey: 'b2b.feature3.desc' },
  { icon: Building2, titleKey: 'b2b.feature4.title', descKey: 'b2b.feature4.desc' },
];

const B2BFeatures: React.FC = () => {
  const { t } = useLang();

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('b2b.features.title')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-[#E6DFD3] text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-[#C97A53]/10 flex items-center justify-center mx-auto mb-5">
                  <Icon size={24} className="text-[#C97A53]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#2E4033] mb-3">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-[#2E4033]/60 leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default B2BFeatures;
