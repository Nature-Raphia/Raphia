import { useLang } from '../context/LangContext'
import rseImage from '../assets/images/rse-artisanes.webp'

export function Engagements() {
  const { t } = useLang()

  return (
    <section id="engagements" className="bg-[var(--color-olive)] py-20 text-[var(--color-ivory)] sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
              {t.engagements.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">{t.engagements.title}</h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--color-ivory)]/75 sm:text-base">
              {t.engagements.intro}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {t.engagements.cards.map((card) => (
                <div key={card.title} className="rounded-2xl bg-[var(--color-ivory)]/5 p-5 ring-1 ring-[var(--color-ivory)]/10">
                  <span className="font-serif text-3xl text-[var(--color-terracotta)]">{card.figure}</span>
                  <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide text-[var(--color-ivory)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-ivory)]/65">{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/20">
              <img
                src={rseImage}
                alt="Artisanes de Nature Raphia à Antsirabe"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <blockquote className="absolute -bottom-8 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl bg-[var(--color-ivory)] p-6 text-center text-[var(--color-olive)] shadow-xl sm:w-[80%]">
              <p className="font-serif text-base italic leading-relaxed sm:text-lg">
                {t.engagements.quoteText}
              </p>
              <footer className="mt-3 text-xs font-semibold uppercase tracking-wide text-[var(--color-terracotta)]">
                {t.engagements.quoteAuthor}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
