import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
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

  const navLinks = [
    { label: t('nav.atelier'), id: 'atelier' },
    { label: t('nav.showroom'), id: 'showroom' },
    { label: t('nav.engagements'), id: 'engagements' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-[#2E4033] flex items-center justify-center group-hover:bg-[#C97A53] transition-colors">
                <span className="text-[#FAF7F2] text-xs font-bold font-serif">NR</span>
              </div>
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-serif text-sm font-semibold text-[#2E4033]">Nature Raphia</span>
                <span className="text-[10px] text-[#C97A53] tracking-widest uppercase font-medium">& Boutique Mahalia</span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-[#2E4033] hover:text-[#C97A53] transition-colors relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C97A53] transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
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
          <div className="md:hidden bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#E6DFD3] px-4 py-4">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="block w-full text-left py-3 text-[#2E4033] font-medium border-b border-[#E6DFD3] last:border-0 hover:text-[#C97A53] transition-colors">
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1 text-xs font-medium text-[#2E4033] border border-[#E6DFD3] rounded-full px-3 py-1.5">
                <Globe size={12} /> {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <button onClick={() => { setMobileOpen(false); onAdminClick(); }}
                className="text-xs text-[#2E4033]/50 border border-[#E6DFD3] rounded-full px-3 py-1.5">
                Admin ⚙
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
