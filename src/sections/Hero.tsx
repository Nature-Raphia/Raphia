import { useLang } from '../context/LangContext'
import heroBg from '../assets/images/hero-bg.webp'

export function Hero() {
  const { t } = useLang()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-[var(--color-olive)]"
    >
      <img
        src={heroBg}
        alt="Artisane tressant le raphia à la main"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-olive)] via-[var(--color-olive)]/40 to-[var(--color-olive)]/20" />

      <div className="relative mx-auto max-w-4xl px-6 pt-24 text-center text-[var(--color-ivory)] sm:px-8">
        <p className="animate-fade-in-up text-xs font-semibold uppercase tracking-[0.35em] text-[var(--color-terracotta)] sm:text-sm">
          {t.hero.eyebrow}
        </p>
        <h1
          className="mt-5 animate-fade-in-up font-serif text-4xl font-medium leading-[1.12] sm:text-5xl md:text-6xl"
          style={{ animationDelay: '0.1s' }}
        >
          {t.hero.title}
        </h1>
        <p
          className="mx-auto mt-6 max-w-xl animate-fade-in-up text-base leading-relaxed text-[var(--color-ivory)]/85 sm:text-lg"
          style={{ animationDelay: '0.2s' }}
        >
          {t.hero.subtitle}
        </p>

        <div
          className="mt-9 flex animate-fade-in-up flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: '0.3s' }}
        >
          <button
            onClick={() => scrollTo('showroom')}
            className="w-full rounded-full bg-[var(--color-terracotta)] px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-terracotta-dark)] sm:w-auto"
          >
            {t.hero.ctaPrimary}
          </button>
          <button
            onClick={() => scrollTo('atelier')}
            className="w-full rounded-full border border-[var(--color-ivory)]/50 px-7 py-3 text-sm font-semibold tracking-wide text-[var(--color-ivory)] transition-colors hover:bg-[var(--color-ivory)]/10 sm:w-auto"
          >
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>

      <button
        onClick={() => scrollTo('atelier')}
        aria-label={t.hero.scroll}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-ivory)]/80"
      >
        <span className="text-[11px] uppercase tracking-[0.25em]">{t.hero.scroll}</span>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-[var(--color-ivory)]/50 p-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-ivory)]" />
        </span>
      </button>
    </section>
  )
}
