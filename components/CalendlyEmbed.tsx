'use client'

import { useEffect } from 'react'

const CALENDLY_URL = 'https://calendly.com/hello-automation-agency/30min'

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
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    )
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)
    }

    function handleMessage(e: MessageEvent) {
      if (!isCalendlyMessage(e.data)) return
      if (e.data.event === 'calendly.event_scheduled' && window.gtag) {
        window.gtag('event', 'conversion', { send_to: 'AW-18121615285' })
        window.gtag('event', 'generate_lead', {
          method: 'calendly_booking',
        })
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div
      className="calendly-inline-widget bg-white border border-brand-border rounded-brand overflow-hidden"
      data-url={CALENDLY_URL}
      style={{ minWidth: '320px', height: `${height}px` }}
    />
  )
}
