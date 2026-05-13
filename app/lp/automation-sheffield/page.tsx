import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Automation Services in Sheffield — South Yorkshire',
  description:
    'AI agents and process automation for Sheffield businesses. Half-hour drive from our Chesterfield base, fixed prices, free 30-minute discovery call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/lp/automation-sheffield' },
  robots: { index: false, follow: true },
}

const data: LandingData = {
  urlSlug: 'automation-sheffield',
  eyebrow: 'AI & Process Automation — Sheffield',
  h1: (
    <>
      AI agents and automation for{' '}
      <em className="not-italic text-accent">Sheffield businesses</em> — built locally.
    </>
  ),
  subhead:
    'Half-hour drive from our Chesterfield base. On-site across S1–S20. Fixed prices, free 30-minute call.',
  intro:
    "Sheffield manufacturing, advanced engineering, professional services, healthcare suppliers — we automate the manual work that's eating your team's hours. Custom AI agents, data pipelines, integrations between the tools you already use. Process Audit £1,500 (credited if you build); single-workflow builds from £3,000 fixed price.",
  bullets: [
    'On-site across Sheffield within 30 minutes',
    'Manufacturing, services, healthcare experience',
    'Fixed prices · scoped upfront',
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
