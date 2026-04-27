'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    intent: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', { send_to: 'AW-18121615285' })
        window.gtag('event', 'generate_lead', {
          method: 'contact_form',
          intent: form.intent || 'unspecified',
        })
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-bg border border-brand-border rounded-brand px-3.5 py-2.5 text-brand-text text-sm font-sans outline-none focus:border-accent transition-colors placeholder:text-brand-muted/50'

  const labelClass = 'block text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-brand-muted mb-1.5'

  if (status === 'success') {
    return (
      <div className="bg-white border border-brand-border rounded-brand p-10 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#e6f4ed] flex items-center justify-center text-[#1a6640] text-xl font-semibold">
          ✓
        </div>
        <h3 className="font-serif text-xl font-normal">Message received</h3>
        <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
          Check your inbox — we&apos;ve sent a confirmation. We&apos;ll be in touch within 24 hours to arrange a call.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-border rounded-brand p-10 flex flex-col gap-4">
      <div>
        <h3 className="font-serif text-xl font-normal mb-1">Send us a message</h3>
        <p className="text-sm text-brand-muted">We respond within 24 hours and will suggest a call time that suits you.</p>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>Your name</label>
        <input id="name" name="name" type="text" required placeholder="Jane Smith" value={form.name} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email address</label>
        <input id="email" name="email" type="email" required placeholder="jane@company.co.uk" value={form.email} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>Company</label>
        <input id="company" name="company" type="text" placeholder="Company name or website" value={form.company} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>What are you looking to automate?</label>
        <textarea id="message" name="message" required rows={3} placeholder="Describe the manual work eating your team's time..." value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
      </div>

      <div>
        <label htmlFor="intent" className={labelClass}>What would you like to do first?</label>
        <select id="intent" name="intent" value={form.intent} onChange={handleChange} className={inputClass}>
          <option value="">Select...</option>
          <option value="discovery">Book a free discovery call</option>
          <option value="audit">I&apos;m ready for a Process Audit (£1,500)</option>
          <option value="unsure">Not sure — just want to talk</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary justify-center py-3 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-center text-red-600">
          Something went wrong — email us at{' '}
          <a href="mailto:hello@automation-agency.co.uk" className="underline">
            hello@automation-agency.co.uk
          </a>
        </p>
      )}

      <p className="text-[0.77rem] text-brand-muted text-center">We respond within 24 hours. No spam, ever.</p>
    </form>
  )
}
