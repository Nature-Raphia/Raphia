import { useEffect, useState } from 'react'
import { useLang } from '../context/LangContext'
import { useCart } from '../context/CartContext'
import logo from '../assets/images/logo-nature-raphia.webp'

const NAV_LINKS = [
  { id: 'atelier', key: 'atelier' as const },
  { id: 'showroom', key: 'showroom' as const },
  { id: 'engagements', key: 'engagements' as const },
  { id: 'contact', key: 'contact' as const },
]

export function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const { totalCount, openCart, lastAddedId } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[var(--color-ivory)]/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2.5"
        >
          <img
            src={logo}
            alt="Nature Raphia & Mahalia"
            className="h-10 w-10 rounded-full object-cover sm:h-11 sm:w-11"
          />
          <span
            className={`hidden font-serif text-sm tracking-[0.18em] uppercase sm:block ${
              scrolled ? 'text-[var(--color-olive)]' : 'text-[var(--color-olive)]'
            }`}
          >
            Nature Raphia
            <span className="block text-[10px] tracking-[0.3em] text-[var(--color-terracotta)]">
              × Mahalia
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium tracking-wide text-[var(--color-olive)]/85 transition-colors hover:text-[var(--color-terracotta)]"
              >
                {t.nav[link.key]}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={toggleLang}
            aria-label="Changer de langue"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-olive)]/25 text-xs font-semibold tracking-wide text-[var(--color-olive)] transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          <button
            onClick={openCart}
            aria-label={t.nav.cart}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-olive)]/25 text-[var(--color-olive)] transition-colors hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="h-[18px] w-[18px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.5h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0 1.664 6.658a1.125 1.125 0 0 0 1.091.844h7.478c.5 0 .938-.335 1.073-.817l1.49-5.36a.563.563 0 0 0-.542-.71H6.606m0 0-.375-1.437M6.75 15.75a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Zm10.5 0a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z"
              />
            </svg>
            {totalCount > 0 && (
              <span
                key={lastAddedId}
                className={`absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-terracotta)] px-1 text-[11px] font-semibold text-white ${
                  lastAddedId ? 'animate-cart-pop' : ''
                }`}
              >
                {totalCount}
              </span>
            )}
          </button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-olive)] lg:hidden"
            aria-label="Menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-6 w-6">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[var(--color-olive)]/10 bg-[var(--color-ivory)] px-4 pb-4 lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="w-full rounded-lg px-2 py-2.5 text-left text-sm font-medium text-[var(--color-olive)] hover:bg-[var(--color-sand)]"
                >
                  {t.nav[link.key]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
