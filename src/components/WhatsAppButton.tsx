import { useState } from 'react'
import { useLang } from '../context/LangContext'

const WHATSAPP_NUMBER = '261347640116'

export function WhatsAppButton() {
  const { t } = useLang()
  const [showTooltip, setShowTooltip] = useState(true)

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsapp.defaultMessage)}`

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 sm:bottom-7 sm:right-7">
      {showTooltip && (
        <div className="relative max-w-[220px] rounded-xl bg-white px-4 py-3 text-sm text-[var(--color-olive)] shadow-lg shadow-black/10 sm:max-w-[240px]">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="close"
            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-olive)] text-[10px] text-white"
          >
            ✕
          </button>
          {t.whatsapp.tooltip}
        </div>
      )}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.label}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7">
          <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.487.71 4.808 1.94 6.782L3 29l6.94-2.36a12.42 12.42 0 0 0 6.06 1.56c6.905 0 12.5-5.596 12.5-12.5S22.906 3 16.001 3zm0 22.7a10.16 10.16 0 0 1-5.19-1.42l-.372-.22-4.12 1.4 1.42-4.02-.24-.39a10.17 10.17 0 0 1-1.598-5.55c0-5.63 4.58-10.2 10.2-10.2 5.63 0 10.2 4.58 10.2 10.2 0 5.63-4.57 10.2-10.2 10.2zm5.6-7.64c-.31-.155-1.82-.9-2.1-1-.28-.104-.484-.155-.688.155-.204.31-.79 1-1 1.2-.18.18-.36.2-.66.05-1.79-.9-2.97-1.6-4.16-3.62-.31-.53.31-.49.89-1.63.1-.2.05-.37-.05-.52-.1-.16-.72-1.73-.98-2.36-.26-.63-.53-.55-.72-.56-.19-.01-.4-.01-.62-.01-.21 0-.55.08-.85.4-.3.31-1.14 1.12-1.14 2.73 0 1.61 1.17 3.17 1.33 3.39.16.22 2.24 3.43 5.44 4.68 2.71 1.05 3.26.85 3.85.79.59-.06 1.82-.75 2.08-1.47.26-.72.26-1.34.18-1.47-.08-.13-.31-.2-.62-.35z" />
        </svg>
      </a>
    </div>
  )
}
