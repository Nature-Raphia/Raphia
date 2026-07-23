import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Building2 } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const ContactMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any = null;
    const initMap = async () => {
      if (!mapRef.current) return;
      const L = await import('leaflet');
      if (map) return;
      // Antsirabe coordinates
      const lat = -19.8659;
      const lng = 47.0333;
      map = L.map(mapRef.current).setView([lat, lng], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      const icon = L.divIcon({
        html: `<div style="background:#C97A53;color:white;border-radius:50% 50% 50% 0;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:18px;transform:rotate(-45deg);box-shadow:0 2px 8px rgba(0,0,0,0.3);border:2px solid white;"><span style="transform:rotate(45deg)">🏪</span></div>`,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });
      L.marker([lat, lng], { icon }).addTo(map)
        .bindPopup(`
          <div style="font-family:'Inter',sans-serif;min-width:180px">
            <strong style="color:#2E4033;font-size:13px">Boutique Mahalia</strong><br/>
            <small style="color:#C97A53">Nature Raphia</small><br/>
            <hr style="border:none;border-top:1px solid #E6DFD3;margin:6px 0"/>
            <small style="color:#666">📍 Rue de l'Indépendance<br/>Antsirabe 110, Madagascar</small>
          </div>
        `, { maxWidth: 220 })
        .openPopup();
    };
    initMap();
    return () => { if (map) { map.remove(); map = null; } };
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" style={{ minHeight: 320 }} />;
};

const Contact: React.FC = () => {
  const { t } = useLang();
  const [b2bForm, setB2bForm] = useState({ company: '', contact: '', email: '', country: '', message: '' });
  const [b2bSent, setB2bSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleB2B = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setB2bSent(true);
  };

  const infos = [
    { icon: MapPin, label: t('contact.address'), value: t('contact.address.value'), color: '#C97A53' },
    { icon: Phone, label: t('contact.phone'), value: '+261 34 76 401 16 / +261 32 XX XX XX', color: '#2E4033' },
    { icon: Mail, label: t('contact.email'), value: 'contact@natureraphia-mahalia.mg', color: '#C97A53' },
    { icon: Clock, label: t('contact.hours'), value: t('contact.hours.value'), color: '#2E4033' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#E6DFD3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C97A53] uppercase tracking-widest mb-4">
            <span className="w-8 h-px bg-[#C97A53]" />
            {t('contact.label')}
            <span className="w-8 h-px bg-[#C97A53]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2E4033] mb-4">
            {t('contact.title')}
          </h2>
        </div>

        {/* Map + Info */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-auto lg:min-h-96 relative z-0">
            <ContactMap />
          </div>

          {/* Info */}
          <div className="space-y-4">
            {infos.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: info.color + '15' }}>
                    <Icon size={18} style={{ color: info.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#2E4033]/50 uppercase tracking-widest mb-1">{info.label}</div>
                    <div className="text-sm text-[#2E4033] font-medium leading-relaxed">{info.value}</div>
                  </div>
                </div>
              );
            })}

            {/* WhatsApp button */}
            <a
              href="https://wa.me/261347640116?text=Bonjour%20Boutique%20Mahalia%20%2F%20Nature%20Raphia%20%F0%9F%91%8B%0AJe%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20cr%C3%A9ations."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-2xl font-semibold transition-colors shadow-md shadow-[#25D366]/30"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp : +261 34 76 401 16
            </a>
          </div>
        </div>

        {/* B2B Form */}
        <div className="bg-[#2E4033] rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building2 size={24} className="text-[#C97A53]" />
                <h3 className="font-serif text-2xl font-semibold text-white">{t('contact.b2b.title')}</h3>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">{t('contact.b2b.subtitle')}</p>
              <div className="space-y-3">
                {['Concept-stores', 'Boutiques hôtelières', 'E-shops mode', 'Distributeurs'].map(type => (
                  <div key={type} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C97A53]" />
                    {type}
                  </div>
                ))}
              </div>
            </div>

            {b2bSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#C97A53]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <p className="text-white font-medium">{t('contact.b2b.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleB2B} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t('contact.b2b.name')}
                    required
                    value={b2bForm.company}
                    onChange={e => setB2bForm(p => ({ ...p, company: e.target.value }))}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                  />
                  <input
                    type="text"
                    placeholder={t('contact.b2b.contact')}
                    required
                    value={b2bForm.contact}
                    onChange={e => setB2bForm(p => ({ ...p, contact: e.target.value }))}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                  />
                </div>
                <input
                  type="email"
                  placeholder={t('contact.email')}
                  required
                  value={b2bForm.email}
                  onChange={e => setB2bForm(p => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                />
                <input
                  type="text"
                  placeholder={t('quote.country')}
                  required
                  value={b2bForm.country}
                  onChange={e => setB2bForm(p => ({ ...p, country: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C97A53] transition-colors"
                />
                <textarea
                  placeholder="Message..."
                  rows={3}
                  value={b2bForm.message}
                  onChange={e => setB2bForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#C97A53] transition-colors resize-none"
                />
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] disabled:opacity-70 text-white py-3 rounded-xl font-medium transition-colors">
                  {loading ? (
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <><Send size={16} /> {t('contact.b2b.submit')}</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
