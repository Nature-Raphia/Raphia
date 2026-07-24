import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Globe, Phone, Users, Home, BookOpen, FileText, MapPin } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const { lang, setLang, t } = useLang();
  const { totalItems, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNavClick = (id: string, isB2B = false) => {
    if (isB2B) {
      scrollTo('b2b');
      return;
    }
    scrollTo(id);
  };

  const contactInfo = {
    phones: ['+261 34 76 401 16', '+261 32 89 328 08'],
    email: 'contact@natureraphia-mahalia.mg'
  };

  const navLinks = [
    { label: t('nav.home'), id: 'home', icon: Home, description: 'Accueil vitrine' },
    { label: t('nav.collections'), id: 'showroom', icon: BookOpen, description: 'Lookbook complet' },
    { label: t('nav.about'), id: 'atelier', icon: FileText, description: 'Notre histoire' },
    { label: t('nav.b2b'), id: 'b2b', icon: Users, description: 'Espace professionnel', isB2B: true },
    { label: t('nav.contact'), id: 'contact', icon: MapPin, description: 'Contact & plan' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
              <img
                src="/logo.jpeg"
                alt="Nature Raphia & Mahalia"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-serif text-sm font-semibold text-[#2E4033]">Nature Raphia</span>
                <span className="text-[10px] text-[#C97A53] tracking-widest uppercase font-medium">& Boutique Mahalia</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id, link.isB2B)}
                    className={`text-sm font-medium transition-colors relative group flex items-center gap-1.5 ${link.isB2B ? 'text-[#C97A53] hover:text-[#2E4033]' : 'text-[#2E4033] hover:text-[#C97A53]'}`}
                  >
                    <Icon size={14} />
                    {link.label}
                    {link.isB2B && <span className="ml-1 text-[10px] uppercase tracking-[0.2em] bg-[#C97A53]/10 px-2 py-0.5 rounded-full">Pro</span>}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C97A53] transition-all group-hover:w-full" />
                  </button>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${contactInfo.phones[0]}`}
                className="hidden lg:flex items-center gap-1 text-xs text-[#2E4033] hover:text-[#C97A53] transition-colors"
              >
                <Phone size={14} />
                <span className="font-medium">{contactInfo.phones[0]}</span>
              </a>

              {/* Lang switcher */}
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="hidden sm:flex items-center gap-1 text-xs font-medium text-[#2E4033] hover:text-[#C97A53] transition-colors border border-[#E6DFD3] rounded-full px-3 py-1.5">
                <Globe size={12} />
                <span>{lang.toUpperCase()}</span>
              </button>

              {/* Cart */}
              <button onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#E6DFD3] transition-colors">
                <ShoppingBag size={20} className="text-[#2E4033]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C97A53] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Admin hidden button */}
              <button onClick={onAdminClick}
                className="hidden md:flex text-xs text-[#2E4033]/40 hover:text-[#2E4033] transition-colors px-2">
                ⚙
              </button>

              {/* Mobile menu */}
              <button onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#E6DFD3] transition-colors">
                {mobileOpen ? <X size={20} className="text-[#2E4033]" /> : <Menu size={20} className="text-[#2E4033]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#E6DFD3] px-4 py-4 max-h-[80vh] overflow-y-auto">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.isB2B)}
                  className={`flex items-center gap-3 w-full text-left py-3 border-b border-[#E6DFD3] last:border-0 transition-colors ${link.isB2B ? 'text-[#C97A53]' : 'text-[#2E4033] hover:text-[#C97A53]'}`}
                >
                  <Icon size={18} />
                  <div>
                    <span className="font-medium">{link.label}</span>
                    <p className="text-[10px] text-gray-500">{link.description}</p>
                  </div>
                  {link.isB2B && (
                    <span className="ml-auto text-[10px] bg-[#C97A53]/10 text-[#C97A53] px-2 py-0.5 rounded-full">
                      PRO
                    </span>
                  )}
                </button>
              );
            })}

            <div className="mt-4 pt-4 border-t border-[#E6DFD3] space-y-2 text-xs text-[#2E4033]">
              <a href={`tel:${contactInfo.phones[0]}`} className="flex items-center gap-2 hover:text-[#C97A53]">
                <Phone size={14} className="text-[#C97A53]" />
                <span>{contactInfo.phones[0]}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-[#C97A53]">
                <MapPin size={14} className="text-[#C97A53]" />
                <span>{contactInfo.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-2 border-t border-[#E6DFD3]">
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1 text-xs font-medium text-[#2E4033] border border-[#E6DFD3] rounded-full px-3 py-1.5">
                <Globe size={12} /> {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <button onClick={() => { setMobileOpen(false); onAdminClick(); }}
                className="text-sm text-[#2E4033] border-2 border-[#2E4033] rounded-full px-6 py-2.5 hover:bg-[#2E4033] hover:text-white transition-all duration-300">
                ⚙ Admin
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
