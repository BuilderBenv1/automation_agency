'use client'

import { useEffect } from 'react'

// A mailto: click on these pages is a support/legal query, not a sales enquiry —
// excluded so Google Ads only optimises toward genuine leads.
const NON_LEAD_PATHS = ['/privacy', '/cookies', '/terms']

/**
 * Fires the Google Ads lead conversion when a visitor clicks an email link.
 * Form submits and Calendly bookings already report the conversion from their
 * own components; this closes the third lead surface (clicking to email us)
 * with a single delegated listener that also covers any mailto: link added later.
 */
export default function ConversionTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const link = target?.closest?.('a[href^="mailto:"]') as HTMLAnchorElement | null
      if (!link) return
      if (NON_LEAD_PATHS.some((p) => window.location.pathname.startsWith(p))) return
      if (!window.gtag) return

      window.gtag('event', 'conversion', {
        send_to: 'AW-18121615285/JOEdCIa656McELXPh8FD',
      })
      window.gtag('event', 'generate_lead', {
        method: 'email_click',
      })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
