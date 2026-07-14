'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const initial = {
  name: '',
  email: '',
  company: '',
  industry: '',
  teamSize: '',
  tools: '',
  processes: '',
  pain: '',
}

const industries = [
  'Professional services',
  'Manufacturing & engineering',
  'Property & construction',
  'Financial services',
  'Healthcare & life sciences',
  'Retail & e-commerce',
  'Logistics & distribution',
  'Marketing & creative',
  'Technology / SaaS',
  'Hospitality & tourism',
  'Other',
]

const teamSizes = ['1–5', '6–20', '21–50', '51–200', '200+']

export default function QuickAuditForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState(initial)

  function update<K extends keyof typeof initial>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.processes) return
    setStatus('loading')
    try {
      const res = await fetch('/api/quick-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-18121615285/JOEdCIa656McELXPh8FD',
        })
        window.gtag('event', 'generate_lead', {
          method: 'quick_audit',
          industry: form.industry || 'unspecified',
        })
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-cream border border-[rgba(19,18,16,0.16)] rounded-xl px-3.5 py-2.5 text-ink text-sm font-sans outline-none focus:border-lime transition-colors placeholder:text-muted-cream/60'
  const labelClass =
    'block text-[0.72rem] font-bold tracking-[0.06em] uppercase text-muted-cream mb-1.5'

  if (status === 'success') {
    return (
      <div className="bg-cream-2 border border-[rgba(19,18,16,0.12)] rounded-2xl p-10 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-lime text-ink flex items-center justify-center text-xl font-display font-bold">
          ✓
        </div>
        <h3 className="font-display font-bold text-xl text-ink">Audit on its way</h3>
        <p className="text-sm text-muted-cream leading-relaxed max-w-md">
          We&apos;ve got your details and we&apos;re putting the assessment together. You&apos;ll hear from us
          by email soon — usually within 24 hours. No spam, no sales calls.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cream-2 border border-[rgba(19,18,16,0.12)] rounded-2xl p-8 md:p-10 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qa-name" className={labelClass}>
            Your name
          </label>
          <input
            id="qa-name"
            type="text"
            required
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="qa-email" className={labelClass}>
            Email
          </label>
          <input
            id="qa-email"
            type="email"
            required
            placeholder="jane@company.co.uk"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="qa-company" className={labelClass}>
            Company
          </label>
          <input
            id="qa-company"
            type="text"
            placeholder="Company name"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="qa-industry" className={labelClass}>
            Industry
          </label>
          <select
            id="qa-industry"
            value={form.industry}
            onChange={(e) => update('industry', e.target.value)}
            className={inputClass}
          >
            <option value="">Select…</option>
            {industries.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="qa-team" className={labelClass}>
          Team size
        </label>
        <div className="flex flex-wrap gap-2">
          {teamSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update('teamSize', s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold font-display border transition-colors ${
                form.teamSize === s
                  ? 'border-lime bg-lime text-ink'
                  : 'border-[rgba(19,18,16,0.16)] text-muted-cream hover:border-ink/40 hover:text-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="qa-processes" className={labelClass}>
          What are the top 2–3 manual processes you wish you could automate?
        </label>
        <textarea
          id="qa-processes"
          required
          rows={3}
          placeholder="E.g. Copying customer data between our CRM and accounts. Generating weekly reports from 4 spreadsheets. Manually chasing invoices."
          value={form.processes}
          onChange={(e) => update('processes', e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="qa-tools" className={labelClass}>
          What tools and systems do you currently use?
        </label>
        <textarea
          id="qa-tools"
          rows={2}
          placeholder="E.g. HubSpot CRM, Xero, Microsoft 365, Shopify, WhatsApp, a custom-built scheduling tool…"
          value={form.tools}
          onChange={(e) => update('tools', e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="qa-pain" className={labelClass}>
          What&apos;s the single biggest pain right now?
        </label>
        <textarea
          id="qa-pain"
          rows={2}
          placeholder="E.g. We're spending 2 days a week on reporting. Or: We can't scale without hiring."
          value={form.pain}
          onChange={(e) => update('pain', e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-lime justify-center w-full disabled:opacity-60 disabled:cursor-not-allowed mt-2"
      >
        {status === 'loading' ? 'Submitting…' : 'Send me my free audit'}
      </button>

      {status === 'error' && (
        <p className="text-xs text-center text-ink font-semibold">
          Something went wrong — email us at{' '}
          <a href="mailto:hello@automation-agency.co.uk" className="underline decoration-lime decoration-2">
            hello@automation-agency.co.uk
          </a>
        </p>
      )}

      <p className="text-[0.77rem] text-muted-cream text-center">
        No commitment. No spam, ever.
      </p>
    </form>
  )
}
