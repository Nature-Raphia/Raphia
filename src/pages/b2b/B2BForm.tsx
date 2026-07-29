import React, { useState } from 'react';
import { MessageCircle, FolderOpen } from 'lucide-react';
import { useLang } from '../../contexts/LanguageContext';
import { contactService } from '../../services/contactService';
import { contactEmailService } from '../../services/contactEmailService';

const WHATSAPP_B2B_NUMBER = '261347640116';

const B2BForm: React.FC = () => {
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

  const formatWhatsAppMessage = (data: typeof form) => {
    return `NOUVELLE DEMANDE B2B - Nature Raphia & Boutique Mahalia

Structure : ${data.structure}
Contact : ${data.contact}
Email : ${data.email}
Pays : ${data.country}
Type de projet : ${data.projectType}

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
        message: `Demande de partenariat B2B :\nStructure : ${form.structure}\nContact : ${form.contact}\nEmail : ${form.email}\nPays : ${form.country}\nType de projet : ${form.projectType}\nMessage : ${form.message || 'Aucun message'}`,
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
        setError(t('b2b.form.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#2E4033]/90 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('b2b.form.title')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
            {t('b2b.form.heading')}
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
                  <FolderOpen size={18} />
                  {t('b2b.form.submit')}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default B2BForm;
