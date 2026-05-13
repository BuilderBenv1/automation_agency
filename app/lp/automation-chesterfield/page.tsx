import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Automation Services in Chesterfield — Same-Day On-Site',
  description:
    'AI agents and process automation for Chesterfield businesses. Local engineer, same-day on-site visits across S40–S45, fixed prices, free 30-minute call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/lp/automation-chesterfield' },
  robots: { index: false, follow: true },
}

const data: LandingData = {
  urlSlug: 'automation-chesterfield',
  eyebrow: 'AI & Process Automation — Chesterfield',
  h1: (
    <>
      Stop paying staff to{' '}
      <em className="not-italic text-accent">copy-paste between systems</em> in Chesterfield.
    </>
  ),
  subhead:
    'Local Chesterfield engineer. Same-day on-site visits across S40–S45. Fixed prices, free 30-minute call.',
  intro:
    "We build AI agents and process automation for businesses across Chesterfield, Markham Vale, Dronfield, and the wider S40–S45 area. Manufacturing, distribution, professional services — wherever your team is bridging the gaps between systems that don't talk, we automate it. Start with a free 30-minute call. If there's a clear opportunity we'll quote a Process Audit (£1,500, fully credited if you build).",
  bullets: [
    'Based in Chesterfield · no travel charge',
    'Same-day on-site visits',
    'Fixed prices · no scope creep',
    'Process Audit credited against build',
    'Built by a senior engineer',
    '30-day post-launch support included',
  ],
  proofs: [
    { client: 'Marmadbir', metric: '< 5min', metricLabel: 'tenant onboarding' },
    { client: 'PlusRooms', metric: '97%', metricLabel: 'borough coverage' },
    { client: 'Experience', metric: '10+ yrs', metricLabel: 'production builds' },
  ],
}

export default function Page() {
  return <LandingPage data={data} />
}
