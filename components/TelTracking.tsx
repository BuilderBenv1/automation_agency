'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export default function TelTracking() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const link = target?.closest('a[href^="tel:"]')
      if (!link) return
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-18121615285/JOEdCIa656McELXPh8FD',
        })
        window.gtag('event', 'generate_lead', { method: 'phone_click' })
      }
      if (window.fbq) {
        window.fbq('track', 'Contact')
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])
  return null
}
