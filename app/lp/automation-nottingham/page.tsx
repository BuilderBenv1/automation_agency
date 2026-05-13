import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Automation Services in Nottingham — East Midlands',
  description:
    'AI and process automation for Nottingham businesses. Easy reach from our Chesterfield base, fixed prices, free 30-minute discovery call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/lp/automation-nottingham' },
  robots: { index: false, follow: true },
}

const data: LandingData = {
  urlSlug: 'automation-nottingham',
  eyebrow: 'AI & Process Automation — Nottingham',
  h1: (
    <>
      Automation built for{' '}
      <em className="not-italic text-accent">Nottingham businesses</em> — fixed price, no surprises.
    </>
  ),
  subhead:
    'East Midlands engineer, easy reach across Nottingham, Beeston, West Bridgford, and the wider NG postcodes. Fixed prices.',
  intro:
    "Nottingham's professional-services base, life-sciences ecosystem, retail HQs, and logistics operators all share the same automation pattern: ops teams stretched across systems that were never designed to talk to each other. We map the workflows, scope the fixes, and build them. Free 30-minute discovery call to start. Process Audit £1,500 fixed (credited if you build).",
  bullets: [
    'East Midlands engineer · easy reach',
    'Professional services, retail, logistics experience',
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
