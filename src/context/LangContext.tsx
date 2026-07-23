import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../types'
import { translations, type Translation } from '../i18n/translations'

interface LangContextValue {
  lang: Lang
  t: Translation
  toggleLang: () => void
  setLang: (lang: Lang) => void
}

const LangContext = createContext<LangContextValue | undefined>(undefined)

const STORAGE_KEY = 'nr-mahalia-lang'

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  const browserLang = window.navigator.language?.toLowerCase() ?? 'fr'
  return browserLang.startsWith('en') ? 'en' : 'fr'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === 'fr' ? 'en' : 'fr'))

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggleLang, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
