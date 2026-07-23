import { useLang } from '../context/LangContext'
import logo from '../assets/images/logo-nature-raphia.webp'

export function Footer() {
  const { t } = useLang()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-[var(--color-olive)] pt-14 text-[var(--color-ivory)]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="Nature Raphia & Mahalia" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-serif text-sm uppercase tracking-[0.18em]">
                Nature Raphia
                <span className="block text-[10px] tracking-[0.3em] text-[var(--color-terracotta)]">
                  × Mahalia
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-ivory)]/70">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-terracotta)]">
              {t.footer.linksTitle}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[var(--color-ivory)]/75">
              <li><button onClick={() => scrollTo('atelier')} className="hover:text-[var(--color-terracotta)]">{t.nav.atelier}</button></li>
              <li><button onClick={() => scrollTo('showroom')} className="hover:text-[var(--color-terracotta)]">{t.nav.showroom}</button></li>
              <li><button onClick={() => scrollTo('engagements')} className="hover:text-[var(--color-terracotta)]">{t.nav.engagements}</button></li>
              <li><button onClick={() => scrollTo('contact')} className="hover:text-[var(--color-terracotta)]">{t.nav.contact}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-terracotta)]">
              {t.footer.contactTitle}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[var(--color-ivory)]/75">
              <li>Rue de l'Indépendance, Antsirabe 110, Madagascar</li>
              <li>
                <a href="tel:+261347640116" className="hover:text-[var(--color-terracotta)]">
                  +261 34 76 401 16
                </a>
              </li>
              <li>
                <a href="mailto:contact@natureraphia-mahalia.mg" className="hover:text-[var(--color-terracotta)]">
                  contact@natureraphia-mahalia.mg
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-terracotta)]">
              {t.footer.hoursTitle}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-[var(--color-ivory)]/75">
              <li>{t.contact.hoursValue}</li>
              <li>{t.contact.hoursClosed}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-[var(--color-ivory)]/10 py-6 text-center text-xs text-[var(--color-ivory)]/55 sm:flex-row sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} Nature Raphia & Mahalia. {t.footer.rights}</span>
          <span>{t.footer.craftedIn}</span>
        </div>
      </div>
    </footer>
  )
}
