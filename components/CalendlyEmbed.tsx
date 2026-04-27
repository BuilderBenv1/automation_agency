'use client'

import { useEffect } from 'react'

const CALENDLY_URL = 'https://calendly.com/hello-automation-agency/30min'

export default function CalendlyEmbed({ height = 700 }: { height?: number }) {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    )
    if (existing) return
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      className="calendly-inline-widget bg-white border border-brand-border rounded-brand overflow-hidden"
      data-url={CALENDLY_URL}
      style={{ minWidth: '320px', height: `${height}px` }}
    />
  )
}
