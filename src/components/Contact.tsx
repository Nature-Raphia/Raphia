import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Building2, MessageCircle } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { contactService } from '../services/contactService';
import { contactEmailService } from '../services/contactEmailService';

const ContactMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Nettoyer l'instance précédente si elle existe
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const initMap = async () => {
      // Vérifier que le conteneur existe et n'a pas déjà une carte
      if (!mapRef.current || mapInstanceRef.current) return;

      try {
        const L = await import('leaflet');

        const lat = -19.8659;
        const lng = 47.0333;
        const map = L.map(mapRef.current, {
          center: [lat, lng],
          zoom: 14,
          zoomControl: true
        });
        mapInstanceRef.current = map;

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
              <small style="color:#666">📍 Route d'Ambositra, en face Hôtel Royal Palace<br/>Antsirabe Afovoany, Madagascar 110</small>
            </div>
          `, { maxWidth: 220 })
          .openPopup();

        // Forcer le redimensionnement après le chargement
        setTimeout(() => {
          map.invalidateSize();
        }, 500);

      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte:', error);
      }
    };

    // Attendre que le DOM soit prêt
    const timer = setTimeout(() => {
      initMap();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-2xl" style={{ minHeight: 320 }} />;
};

const Contact: React.FC = () => {
  const { t } = useLang();
  const [b2bForm, setB2bForm] = useState({ 
    company: '', 
    contact: '', 
    email: '', 
    country: '', 
    message: '' 
  });
  const [b2bSent, setB2bSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Numéro WhatsApp officiel pour les demandes B2B
  const WHATSAPP_B2B_NUMBER = '261379943312';
  const WHATSAPP_OFFICIAL_NUMBER = '261347640116';

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) { 
        setVisible(true); 
        obs.disconnect(); 
      } 
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Fonction pour formater le message WhatsApp
  const formatWhatsAppMessage = (data: typeof b2bForm) => {
    return `NOUVELLE DEMANDE B2B - Nature Raphia & Boutique Mahalia

Société : ${data.company}
Contact : ${data.contact}
Email : ${data.email}
Pays : ${data.country}
Message : ${data.message || 'Aucun message'}

Adresse : Route d'Ambositra, en face Hôtel Royal Palace, Antsirabe Afovoany
Tél : +261 34 76 401 16 / +261 32 89 328 08
Horaires : Lun-Sam 08h30 - 18h00

Demande reçue le : ${new Date().toLocaleString('fr-FR')}`;
  };

  // Fonction pour ouvrir WhatsApp avec le message prérempli
  const buildWhatsAppUrl = (phone: string, message: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${encodedMessage}`;
  };

  const sendToWhatsApp = (data: typeof b2bForm) => {
    const message = formatWhatsAppMessage(data);
    const url = buildWhatsAppUrl(WHATSAPP_B2B_NUMBER, message);

    if (typeof window !== 'undefined') {
      const popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (!popup) {
        window.location.href = url;
      }
    }
  };

  const handleB2B = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setWhatsappSent(false);

    try {
      // 1. Sauvegarder dans Supabase
      const result = await contactService.submit({
        name: b2bForm.contact,
        email: b2bForm.email,
        phone: '',
        subject: b2bForm.company,
        message: b2bForm.message || `Pays: ${b2bForm.country}`,
      });

      if (!result) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      // 2. Envoyer un email à l'admin via EmailJS
      await contactEmailService.sendContactEmail({
        name: b2bForm.contact,
        email: b2bForm.email,
        phone: '',
        subject: `Demande B2B - ${b2bForm.company}`,
        message: `
Message du formulaire B2B :
- Société : ${b2bForm.company}
- Contact : ${b2bForm.contact}
- Email : ${b2bForm.email}
- Pays : ${b2bForm.country}
- Message : ${b2bForm.message || 'Aucun message'}
        `.trim(),
        type: 'b2b'
      });

      // 3. Envoyer sur WhatsApp (ouverture dans un nouvel onglet)
      sendToWhatsApp(b2bForm);
      setWhatsappSent(true);

      setB2bSent(true);
      
      // Réinitialiser le formulaire après 8 secondes
      setTimeout(() => {
        setB2bSent(false);
        setWhatsappSent(false);
        setB2bForm({ company: '', contact: '', email: '', country: '', message: '' });
      }, 8000);

    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const infos = [
    { icon: MapPin, label: t('contact.address'), value: t('contact.address.value'), color: '#C97A53' },
    { icon: Phone, label: t('contact.phone'), value: '+261 34 76 401 16 / +261 32 89 328 08', color: '#2E4033' },
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

            {/* WhatsApp button - Double option */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_OFFICIAL_NUMBER}?text=Bonjour%20Boutique%20Mahalia%20%2F%20Nature%20Raphia%0AJe%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20cr%C3%A9ations.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-2xl font-medium transition-colors shadow-md shadow-[#25D366]/30 text-sm"
              >
                <MessageCircle size={18} />
                WhatsApp Client
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_B2B_NUMBER}?text=Bonjour%2C%20je%20souhaite%20discuter%20d%E2%80%99un%20partenariat%20B2B%20avec%20Nature%20Raphia.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-[#2E4033] hover:bg-[#1a2d1e] text-white rounded-2xl font-medium transition-colors shadow-md shadow-[#2E4033]/30 text-sm"
              >
                <Building2 size={18} />
                WhatsApp B2B
              </a>
            </div>
          </div>
        </div>

        {/* B2B Form */}
        <div id="b2b" className="bg-[#2E4033] rounded-3xl p-8 md:p-12">
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

              {/* Indicateur WhatsApp */}
              <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={16} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-white/90 text-sm font-medium">Envoi simultané sur WhatsApp</p>
                   
                  </div>
                </div>
              </div>
            </div>

            {b2bSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <p className="text-white font-medium text-lg">Demande envoyée avec succès !</p>
                <p className="text-white/50 text-sm mt-2">
                  {whatsappSent ? (
                    <span className="flex items-center justify-center gap-2 text-[#25D366]">
                      <MessageCircle size={16} />
                      WhatsApp ouvert pour confirmation
                    </span>
                  ) : (
                    'Un email a été envoyé à l\'administrateur.'
                  )}
                </p>
              /*  <p className="text-white/40 text-xs mt-3">
                  Une copie a été envoyée sur WhatsApp (+261 34 76 401 16)
                </p>
              </div>
            ) : (
              <form onSubmit={handleB2B} className="space-y-4">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}
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
                
                {/* Indicateur d'envoi WhatsApp */}
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <MessageCircle size={12} />
                  <span>Une copie sera envoyée sur WhatsApp B2B (+261 34 76 401 16)</span>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#C97A53] hover:bg-[#a8623e] disabled:opacity-70 text-white py-3.5 rounded-xl font-medium transition-colors">
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