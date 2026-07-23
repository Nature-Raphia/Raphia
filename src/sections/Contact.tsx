import { useState, type FormEvent } from 'react'
import { useLang } from '../context/LangContext'
import { Map } from '../components/Map'

const WHATSAPP_NUMBER = '261347640116'

export function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [form, setForm] = useState({ name: '', company: '', email: '', country: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const text = [
      'Nouvelle demande B2B — Nature Raphia & Mahalia',
      `Nom: ${form.name}`,
      form.company ? `Société: ${form.company}` : null,
      `Email: ${form.email}`,
      `Pays: ${form.country}`,
      `Message: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.setTimeout(() => {
      setStatus('sent')
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        '_blank',
      )
    }, 700)
  }

  return (
    <section id="contact" className="bg-[var(--color-ivory)] pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-terracotta)]">
            {t.contact.eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium text-[var(--color-olive)] sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-olive)]/75 sm:text-base">
            {t.contact.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Coordonnées + carte */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-5 rounded-2xl bg-white/60 p-6 ring-1 ring-[var(--color-olive)]/8 sm:grid-cols-2">
              <InfoBlock
                label={t.contact.addressLabel}
                value="Rue de l'Indépendance, Antsirabe 110, Madagascar"
                hint={t.contact.landmark}
              />
              <InfoBlock label={t.contact.phoneLabel} value="+261 34 76 401 16" hint="+261 32 XX XX XX XX" />
              <InfoBlock label={t.contact.emailLabel} value="contact@natureraphia-mahalia.mg" />
              <InfoBlock
                label={t.contact.hoursLabel}
                value={t.contact.hoursValue}
                hint={t.contact.hoursClosed}
              />
            </div>

            <div className="h-[320px] overflow-hidden rounded-2xl ring-1 ring-[var(--color-olive)]/10 sm:h-[380px]">
              <Map />
            </div>
            <p className="text-center text-xs text-[var(--color-olive)]/50">{t.contact.mapCaption}</p>
          </div>

          {/* Formulaire B2B */}
          <div className="rounded-2xl bg-[var(--color-olive)] p-6 text-[var(--color-ivory)] sm:p-8">
            <h3 className="font-serif text-2xl">{t.contact.b2bTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-ivory)]/75">{t.contact.b2bIntro}</p>

            {status === 'sent' ? (
              <div className="mt-8 rounded-xl bg-[var(--color-ivory)]/10 p-6 text-center">
                <p className="text-sm font-medium text-[var(--color-ivory)]">{t.contact.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <Field
                  label={t.contact.form.name}
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <Field
                  label={t.contact.form.company}
                  value={form.company}
                  onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                />
                <Field
                  label={t.contact.form.email}
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  required
                />
                <Field
                  label={t.contact.form.country}
                  value={form.country}
                  onChange={(v) => setForm((f) => ({ ...f, country: v }))}
                  required
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ivory)]/70">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="rounded-lg bg-[var(--color-ivory)]/10 px-4 py-3 text-sm text-[var(--color-ivory)] placeholder-[var(--color-ivory)]/40 outline-none ring-1 ring-[var(--color-ivory)]/15 transition-shadow focus:ring-2 focus:ring-[var(--color-terracotta)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-2 rounded-full bg-[var(--color-terracotta)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[var(--color-terracotta-dark)] disabled:opacity-60"
                >
                  {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-terracotta)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-[var(--color-olive)]">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-[var(--color-olive)]/55">{hint}</p>}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ivory)]/70">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg bg-[var(--color-ivory)]/10 px-4 py-2.5 text-sm text-[var(--color-ivory)] placeholder-[var(--color-ivory)]/40 outline-none ring-1 ring-[var(--color-ivory)]/15 transition-shadow focus:ring-2 focus:ring-[var(--color-terracotta)]"
      />
    </div>
  )
}
