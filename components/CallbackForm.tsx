'use client'

import { useState } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function CallbackForm({
  heading = 'Get a callback within 24 hours',
  subheading = "Two fields. No pitch. We'll call when it suits you.",
  context,
  compact = false,
}: {
  heading?: string
  subheading?: string
  context?: string
  compact?: boolean
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', phone: '', note: '', website: '' })

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    if (form.website) return // honeypot — bots fill this, humans don't
    setStatus('loading')
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          note: form.note,
          context: context || (typeof window !== 'undefined' ? window.location.pathname : ''),
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-18121615285/JOEdCIa656McELXPh8FD',
        })
        window.gtag('event', 'generate_lead', {
          method: 'callback_form',
          context: context || 'unspecified',
        })
      }
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-white border border-brand-border rounded-brand px-3.5 py-2.5 text-brand-text text-sm font-sans outline-none focus:border-accent transition-colors placeholder:text-brand-muted/50'
  const labelClass =
    'block text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-brand-muted mb-1.5'

  if (status === 'success') {
    return (
      <div
        className={`bg-white border border-brand-border rounded-brand ${
          compact ? 'p-6' : 'p-8'
        } flex flex-col items-center text-center gap-3`}
      >
        <div className="w-12 h-12 rounded-full bg-[#e6f4ed] flex items-center justify-center text-[#1a6640] text-xl font-semibold">
          ✓
        </div>
        <h3 className="font-serif text-[1.15rem] font-normal">
          We&apos;ll call you within 24 hours
        </h3>
        <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
          Usually much sooner. We&apos;ll talk through what your team is doing manually and what could be automated. No pitch.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white border border-brand-border rounded-brand ${
        compact ? 'p-6' : 'p-7 md:p-8'
      } flex flex-col gap-4`}
    >
      <div>
        <h3 className="font-serif font-normal text-[1.25rem] mb-1.5 tracking-[-0.01em]">{heading}</h3>
        <p className="text-[0.82rem] text-brand-muted leading-snug">{subheading}</p>
      </div>

      <div>
        <label htmlFor="cb-name" className={labelClass}>Your name</label>
        <input
          id="cb-name"
          type="text"
          required
          placeholder="Jane Smith"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          className={inputClass}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="cb-phone" className={labelClass}>Phone number</label>
        <input
          id="cb-phone"
          type="tel"
          required
          placeholder="07700 900000"
          value={form.phone}
          onChange={(e) => update('phone', e.target.value)}
          className={inputClass}
          autoComplete="tel"
        />
      </div>

      {!compact && (
        <div>
          <label htmlFor="cb-note" className={labelClass}>
            What&apos;s the manual work eating your time?{' '}
            <span className="text-brand-muted/60 normal-case font-normal">(optional)</span>
          </label>
          <textarea
            id="cb-note"
            rows={2}
            placeholder="E.g. We spend 2 days a week pulling reports out of 4 spreadsheets..."
            value={form.note}
            onChange={(e) => update('note', e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="cb-website">Website</label>
        <input
          id="cb-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary justify-center py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending…' : 'Request callback'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-center text-red-600">
          Something went wrong — call us directly on{' '}
          <a href="tel:+441246923041" className="underline">01246 923041</a>
        </p>
      )}

      <p className="text-[0.72rem] text-brand-muted text-center leading-snug">
        We respond within 24 hours, usually sooner. By submitting you agree to our{' '}
        <a href="/privacy" className="underline hover:text-brand-text">privacy policy</a>.
      </p>
    </form>
  )
}
