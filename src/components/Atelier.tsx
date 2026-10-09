import { useEffect, useState } from 'react'
import { useLang } from '../contexts/LanguageContext'
import { getAtelierPageHeader, getAtelierSteps } from '../services/atelierService'
import type { AtelierPageHeader, AtelierStep } from '../types'

// Étapes affichées tant qu'aucune étape n'a été saisie depuis l'espace admin
const FALLBACK_IMAGES = ['/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg']

export default function Atelier() {
  const { t, lang } = useLang()
  const [active, setActive] = useState(0)
  const [dbSteps, setDbSteps] = useState<AtelierStep[] | null>(null)
  const [dbHeader, setDbHeader] = useState<AtelierPageHeader | null>(null)

  useEffect(() => {
    let cancelled = false

    getAtelierSteps().then(rows => {
      if (cancelled || rows.length === 0) return
      setDbSteps(rows)
      setActive(0)
    })

    getAtelierPageHeader().then(header => {
      if (cancelled || !header) return
      setDbHeader(header)
    })

    return () => {
      cancelled = true
    }
  }, [])

  const steps = dbSteps
    ? dbSteps.map(step => ({
        title: step.title[lang] || step.title.fr,
        text: step.description[lang] || step.description.fr,
        image: step.image,
      }))
    : FALLBACK_IMAGES.map((image, idx) => ({
        title: t(`atelier.step${idx + 1}.title`),
        text: t(`atelier.step${idx + 1}.desc`),
        image,
      }))

  // En-tête saisi depuis l'admin, sinon textes par défaut du site
  const headerText = (field: 'eyebrow' | 'title' | 'intro') =>
    dbHeader?.[field][lang] || dbHeader?.[field].fr || t(`atelier.${field}`)

  return (
    <section id="atelier" className="bg-[var(--color-ivory)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
            {headerText('eyebrow')}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-[var(--color-olive)] sm:text-4xl">
            {headerText('title')}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-olive)]/75 sm:text-base">
            {headerText('intro')}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl shadow-[var(--color-olive)]/10">
            {steps.map((step, idx) => (
              <img
                key={idx}
                src={step.image}
                alt={step.title}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  idx === active ? 'opacity-100' : 'opacity-0'
                }`}
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-olive)]/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-full bg-[var(--color-ivory)]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-olive)]">
              {t('atelier.stepLabel')} {active + 1} / {steps.length}
            </div>
          </div>

          {/* Frise chronologique interactive */}
          <ol className="relative flex flex-col gap-1 border-l border-[var(--color-sand-dark)] pl-6 sm:pl-8">
            {steps.map((step, idx) => {
              const isActive = idx === active
              return (
                <li key={idx} className="relative py-4">
                  <button
                    onClick={() => setActive(idx)}
                    className="group flex w-full items-start gap-4 text-left"
                  >
                    <span
                      className={`absolute -left-[33px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors sm:-left-[41px] ${
                        isActive
                          ? 'border-[var(--color-terracotta)] bg-[var(--color-terracotta)]'
                          : 'border-[var(--color-sand-dark)] bg-[var(--color-ivory)]'
                      }`}
                    />
                    <div>
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                          isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-olive)]/45'
                        }`}
                      >
                        {t('atelier.stepLabel')} {idx + 1}
                      </span>
                      <h3
                        className={`mt-1 font-serif text-xl transition-colors sm:text-2xl ${
                          isActive ? 'text-[var(--color-olive)]' : 'text-[var(--color-olive)]/55'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`mt-2 max-w-md text-sm leading-relaxed transition-all ${
                          isActive
                            ? 'max-h-40 text-[var(--color-olive)]/75 opacity-100'
                            : 'max-h-0 overflow-hidden text-[var(--color-olive)]/0 opacity-0 sm:max-h-40 sm:text-[var(--color-olive)]/60 sm:opacity-70'
                        }`}
                      >
                        {step.text}
                      </p>
                    </div>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
