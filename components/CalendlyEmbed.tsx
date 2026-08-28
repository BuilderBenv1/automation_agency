'use client'

import { useEffect, useState } from 'react'

const CALENDLY_URL = 'https://calendly.com/hello-automation-agency/30min'

const ROLES: [string, string][] = [
  ['owner_director', 'Owner / Director'],
  ['ops_office_manager', 'Operations or Office Manager'],
  ['developer', 'Developer'],
  ['other', 'Other'],
]

const TEAM_SIZES = ['1–5', '6–20', '21–50', '51–200', '200+']

function isCalendlyMessage(data: unknown): data is { event: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'event' in data &&
    typeof (data as { event: unknown }).event === 'string' &&
    (data as { event: string }).event.startsWith('calendly.')
  )
}

export default function CalendlyEmbed({ height = 700 }: { height?: number }) {
  // Two questions before the slot picker. Answers ride along on the booking
  // via Calendly's a1/a2 prefill params so the call is qualified before it
  // starts. Deliberately kept to two fields — any more and it stops being a
  // low-friction booking.
  const [role, setRole] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return

    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    )
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)
    } else {
      // Widget already loaded on this page — ask it to bind the new element.
      const w = window as unknown as { Calendly?: { initInlineWidgets?: () => void } }
      w.Calendly?.initInlineWidgets?.()
    }
  }, [started])

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!isCalendlyMessage(e.data)) return
      if (e.data.event === 'calendly.event_scheduled' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-18121615285/r793CO-139IcELXPh8FD',
        })
        window.gtag('event', 'generate_lead', {
          method: 'calendly_booking',
          role: role || 'unspecified',
          team_size: teamSize || 'unspecified',
        })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [role, teamSize])

  const selectClass =
    'w-full bg-cream border border-[rgba(19,18,16,0.16)] rounded-xl px-3.5 py-2.5 text-ink text-sm font-sans outline-none focus:border-lime transition-colors'
  const labelClass =
    'block text-[0.72rem] font-bold tracking-[0.06em] uppercase text-muted-cream mb-1.5'

  if (!started) {
    return (
      <div className="bg-cream-2 border border-[rgba(19,18,16,0.12)] rounded-2xl p-8 md:p-10">
        <h3 className="font-display font-bold text-xl text-ink mb-1.5">
          Two quick questions, then pick your slot
        </h3>
        <p className="text-sm text-muted-cream leading-relaxed mb-7 max-w-[42ch]">
          So we can come to the call with something useful rather than spending the first ten
          minutes working out who you are.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
          <div>
            <label htmlFor="cal-role" className={labelClass}>
              Your role
            </label>
            <select
              id="cal-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={selectClass}
            >
              <option value="">Select...</option>
              {ROLES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cal-team" className={labelClass}>
              Team size
            </label>
            <select
              id="cal-team"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className={selectClass}
            >
              <option value="">Select...</option>
              {TEAM_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size} people
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setStarted(true)}
          disabled={!role || !teamSize}
          className="btn-lime justify-center w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          See available times →
        </button>
      </div>
    )
  }

  const roleLabel = ROLES.find(([value]) => value === role)?.[1] ?? role
  const url = `${CALENDLY_URL}?a1=${encodeURIComponent(roleLabel)}&a2=${encodeURIComponent(
    `${teamSize} people`
  )}`

  return (
    <div
      className="calendly-inline-widget bg-cream-2 border border-[rgba(19,18,16,0.12)] rounded-2xl overflow-hidden"
      data-url={url}
      style={{ minWidth: '320px', height: `${height}px` }}
    />
  )
}
