import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Business Automation Consultant — Fixed-Price Builds, UK',
  description:
    'Business automation consultant for UK SMEs. We map your manual work, build the systems that eliminate it, and hand them over running. Fixed prices, free discovery call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/lp/business-automation-consultant' },
  robots: { index: false, follow: true },
}

const data: LandingData = {
  urlSlug: 'business-automation-consultant',
  eyebrow: 'Business Automation Consultant',
  h1: (
    <>
      Eliminate the{' '}
      <em className="not-italic text-accent">manual work</em> your team is doing — for good.
    </>
  ),
  subhead:
    "If you've grown faster than your processes, automation is the cheapest way to scale without adding headcount.",
  intro:
    "We're a UK business-automation consultancy that maps your current workflows, identifies where the time is actually going, and builds the systems that automate it end-to-end. Every project is fixed-price. Every engagement starts with a free 30-minute discovery call. Most clients then commission a £1,500 Process Audit before any build — fully credited if they proceed.",
  bullets: [
    'For UK SMEs (5–200 staff)',
    'Fixed prices · scoped before work starts',
    'Process Audit £1,500 · credited if you build',
    'Builds from £3,000 · 2–6 weeks',
    'No retainer lock-in · no scope creep',
    'Free 30-minute discovery call',
  ],
  proofs: [
    { client: 'Marmadbir', metric: '0', metricLabel: 'manual coordinator hours' },
    { client: 'PlusRooms', metric: '97%', metricLabel: 'borough coverage' },
    { client: 'Punthub', metric: '21', metricLabel: 'auto reconciliation jobs' },
  ],
}

export default function Page() {
  return <LandingPage data={data} />
}
