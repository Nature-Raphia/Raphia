import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

const ContactMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const initMap = async () => {
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

        setTimeout(() => {
          map.invalidateSize();
        }, 500);

      } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte:', error);
      }
    };

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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  const infos = [
    { icon: MapPin, label: t('contact.address'), value: t('contact.address.value'), color: '#C97A53' },
    { icon: Phone, label: t('contact.phone'), value: '+261 34 76 401 16 / +261 32 89 328 08', color: '#2E4033' },
    { icon: Mail, label: t('contact.email'), value: 'contact@natureraphia-mahalia.mg', color: '#C97A53' },
    { icon: Clock, label: t('contact.hours'), value: t('contact.hours.value'), color: '#2E4033' },
  ];

  return (
    <section id="contact" className="py-24 bg-[#E6DFD3]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-auto lg:min-h-96 relative z-0">
            <ContactMap />
          </div>

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
                href={`https://wa.me/${WHATSAPP_OFFICIAL_NUMBER}?text=Bonjour%2C%20je%20souhaite%20discuter%20d%E2%80%99un%20partenariat%20B2B%20avec%20Nature%20Raphia.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 bg-[#2E4033] hover:bg-[#1a2d1e] text-white rounded-2xl font-medium transition-colors shadow-md shadow-[#2E4033]/30 text-sm"
              >
                <MessageCircle size={18} />
                WhatsApp B2B
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;