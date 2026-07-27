import React, { useState } from 'react';
import { ArrowRight, Building2, Truck, Users, BadgeCheck, MessageCircle, Phone } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { contactService } from '../services/contactService';
import { contactEmailService } from '../services/contactEmailService';
import { Link } from 'react-router-dom';

const B2B: React.FC = () => {
  const { t } = useLang();

  const [form, setForm] = useState({
    structure: '',
    contact: '',
    email: '',
    country: '',
    projectType: '',
    volume: '',
    message: ''
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const WHATSAPP_B2B_NUMBER = '261347640116';

  const formatWhatsAppMessage = (data: typeof form) => {
    return `NOUVELLE DEMANDE B2B - Nature Raphia & Boutique Mahalia

Structure : ${data.structure}
Contact : ${data.contact}
Email : ${data.email}
Pays : ${data.country}
Type de projet : ${data.projectType}
Volume estimé : ${data.volume}
Message : ${data.message || 'Aucun message'}

Demande reçue le : ${new Date().toLocaleString('fr-FR')}`;
  };

  const sendToWhatsApp = (data: typeof form) => {
    const message = formatWhatsAppMessage(data);
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_B2B_NUMBER}&text=${encodeURIComponent(message)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactService.submit({
        name: form.contact,
        email: form.email,
        phone: '',
        subject: `Demande B2B - ${form.structure}`,
        message: `Structure : ${form.structure}\nPays : ${form.country}\nVolume : ${form.volume}\nMessage : ${form.message || 'Aucun message'}`,
      });

      await contactEmailService.sendContactEmail({
        name: form.contact,
        email: form.email,
        phone: '',
        subject: `Demande Partenariat B2B - ${form.structure}`,
        message: `Demande de partenariat B2B :\nStructure : ${form.structure}\nContact : ${form.contact}\nEmail : ${form.email}\nPays : ${form.country}\nType de projet : ${form.projectType}\nVolume estimé : ${form.volume}\nMessage : ${form.message || 'Aucun message'}`,
        type: 'b2b'
      });

      sendToWhatsApp(form);
      setSent(true);

      setTimeout(() => {
        setSent(false);
        setForm({ structure: '', contact: '', email: '', country: '', projectType: '', volume: '', message: '' });
      }, 8000);

    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: BadgeCheck, titleKey: 'b2b.feature1.title', descKey: 'b2b.feature1.desc' },
    { icon: Users, titleKey: 'b2b.feature2.title', descKey: 'b2b.feature2.desc' },
    { icon: Truck, titleKey: 'b2b.feature3.title', descKey: 'b2b.feature3.desc' },
    { icon: Building2, titleKey: 'b2b.feature4.title', descKey: 'b2b.feature4.desc' },
  ];

  return (
    <div className="relative">
      {/* Hero Section with blur bg */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1920&q=85"
            alt="B2B Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A261E]/70 via-[#2E4033]/40 to-[#2E4033]/10 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
         

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
            {t('b2b.hero.title')}
          </h1>

          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {t('b2b.hero.subtitle')}
          </p>

          <Link
            to="/showroom"
            className="inline-flex items-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#C97A53]/40"
          >
            {t('b2b.hero.cta')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Partnership Form */}
      <section className="py-24 bg-[#2E4033]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-[#C97A53]" />
              {t('b2b.form.title')}
              <span className="w-8 h-px bg-[#C97A53]" />
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
              Espace B2B
            </h2>
          </div>

          {sent ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <p className="text-white font-medium text-lg">{t('b2b.form.success')}</p>
              <p className="text-white/50 text-sm mt-2">
                <span className="flex items-center justify-center gap-2 text-[#25D366]">
                  <MessageCircle size={16} />
                  {t('b2b.form.whatsapp')}
                </span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-xs font-medium uppercase tracking-widest mb-2">
                    {t('b2b.form.structure')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.structure}
                    onChange={e => setForm(p => ({ ...p, structure: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                    placeholder={t('b2b.form.ph.structure')}
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-medium uppercase tracking-widest mb-2">
                    {t('b2b.form.contact')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.contact}
                    onChange={e => setForm(p => ({ ...p, contact: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                    placeholder={t('b2b.form.ph.contact')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-xs font-medium uppercase tracking-widest mb-2">
                    {t('b2b.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                    placeholder={t('b2b.form.ph.email')}
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-medium uppercase tracking-widest mb-2">
                    {t('b2b.form.country')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.country}
                    onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                    placeholder={t('b2b.form.ph.country')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/70 text-xs font-medium uppercase tracking-widest mb-2">
                    {t('b2b.form.projectType')}
                  </label>
                  <input
                    type="text"
                    value={form.projectType}
                    onChange={e => setForm(p => ({ ...p, projectType: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                    placeholder={t('b2b.form.ph.projectType')}
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs font-medium uppercase tracking-widest mb-2">
                    {t('b2b.form.volume')}
                  </label>
                  <input
                    type="text"
                    value={form.volume}
                    onChange={e => setForm(p => ({ ...p, volume: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                    placeholder={t('b2b.form.ph.volume')}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-xs font-medium uppercase tracking-widest mb-2">
                  {t('b2b.form.message')}
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#C97A53] transition-colors resize-none"
                  placeholder={t('b2b.form.ph.message')}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] disabled:opacity-70 text-white py-4 rounded-xl font-medium text-sm tracking-wide transition-colors"
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <>
                    <MessageCircle size={18} />
                    {t('b2b.form.submit')}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={`https://wa.me/${WHATSAPP_B2B_NUMBER}?text=Bonjour%2C%20je%20souhaite%20discuter%20d%E2%80%99un%20partenariat%20B2B%20avec%20Nature%20Raphia.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300"
            >
              <MessageCircle size={18} />
              {t('b2b.cta.whatsapp')}
            </a>
            <a
              href="tel:+261347640116"
              className="flex items-center gap-2 border border-[#2E4033]/20 hover:bg-[#2E4033] text-[#2E4033] hover:text-white px-8 py-4 rounded-full font-light text-sm tracking-wide transition-all duration-300"
            >
              <Phone size={18} />
              +261 34 76 401 16
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default B2B;