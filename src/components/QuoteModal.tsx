import { useState, type FormEvent } from 'react'
import { useLang } from '../context/LangContext'
import { useCart } from '../context/CartContext'
import type { BuyerProfile } from '../types'

const WHATSAPP_NUMBER = '261347640116'

export function QuoteModal() {
  const { lang, t } = useLang()
  const { items, isQuoteModalOpen, closeQuoteModal, clearCart, totalCount } = useCart()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [profile, setProfile] = useState<BuyerProfile>('particulier')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  if (!isQuoteModalOpen) return null

  const buildRecapMessage = () => {
    const lines = [
      '🌿 *Nouvelle demande de devis — Nature Raphia & Mahalia*',
      '',
      `*Nom* : ${name}`,
      `*E-mail* : ${email}`,
      `*Pays de destination* : ${country}`,
      `*Profil* : ${profile === 'particulier' ? t.cart.profileParticulier : t.cart.profileGrossiste}`,
      '',
      `*Sélection (${totalCount} ${t.cart.itemsCount})* :`,
      ...items.map((item) => `• ${item.product.name[lang]} × ${item.quantity}`),
    ]
    return lines.join('\n')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    window.setTimeout(() => {
      const message = buildRecapMessage()
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
      setStatus('success')
    }, 800)
  }

  const handleClose = () => {
    closeQuoteModal()
    if (status === 'success') {
      clearCart()
      setName('')
      setEmail('')
      setCountry('')
      setProfile('particulier')
      setStatus('idle')
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[var(--color-olive)]/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="thin-scrollbar relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-[var(--color-ivory)] p-6 shadow-2xl sm:p-8">
        <button
          onClick={handleClose}
          aria-label={t.cart.close}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-olive)] hover:bg-[var(--color-sand)]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-olive)]/10 text-3xl">
              🌿
            </div>
            <h2 className="font-serif text-2xl text-[var(--color-olive)]">{t.cart.successTitle}</h2>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-olive)]/70">
              {t.cart.successText}
            </p>
            <button
              onClick={handleClose}
              className="mt-2 rounded-full bg-[var(--color-terracotta)] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[var(--color-terracotta-dark)]"
            >
              {t.cart.close}
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-serif text-2xl text-[var(--color-olive)]">{t.cart.modalTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-olive)]/70">{t.cart.modalIntro}</p>

            {/* Récapitulatif */}
            <div className="mt-5 rounded-xl bg-[var(--color-sand)]/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-terracotta)]">
                {t.cart.recapTitle}
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {items.map((item) => (
                  <li key={item.product.id} className="flex justify-between text-sm text-[var(--color-olive)]">
                    <span>{item.product.name[lang]}</span>
                    <span className="font-medium">× {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <ModalField label={t.cart.formName} value={name} onChange={setName} required />
              <ModalField label={t.cart.formEmail} type="email" value={email} onChange={setEmail} required />
              <ModalField
                label={t.cart.formCountry}
                value={country}
                onChange={setCountry}
                placeholder={t.cart.formCountryPlaceholder}
                required
              />

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-olive)]/60">
                  {t.cart.formProfile}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['particulier', 'grossiste'] as BuyerProfile[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProfile(p)}
                      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                        profile === p
                          ? 'border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)]'
                          : 'border-[var(--color-olive)]/15 text-[var(--color-olive)]/70 hover:border-[var(--color-olive)]/30'
                      }`}
                    >
                      {p === 'particulier' ? t.cart.profileParticulier : t.cart.profileGrossiste}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-2 rounded-full bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[var(--color-terracotta-dark)] disabled:opacity-60"
              >
                {status === 'submitting' ? t.cart.submitting : t.cart.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function ModalField({
  label,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-olive)]/60">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[var(--color-olive)]/15 bg-white px-4 py-2.5 text-sm text-[var(--color-olive)] outline-none transition-shadow focus:ring-2 focus:ring-[var(--color-terracotta)]"
      />
    </div>
  )
}
