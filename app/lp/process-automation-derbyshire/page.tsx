import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'Process Automation Derbyshire — Fixed-Price Builds, Free Discovery Call',
  description:
    'Process automation for Derbyshire businesses, run from Chesterfield. Fixed-price builds, in-person kickoffs, £1,500 Process Audit credited if you build. Free 30-minute discovery call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/lp/process-automation-derbyshire' },
  robots: { index: false, follow: true },
}

const data: LandingData = {
  urlSlug: 'process-automation-derbyshire',
  eyebrow: 'Process Automation — Derbyshire',
  h1: (
    <>
      <em className="not-italic text-accent">Process automation</em> for Derbyshire businesses,
      run from Chesterfield.
    </>
  ),
  subhead:
    "We map where your team's time actually goes, identify the highest-ROI targets, and build the systems that eliminate them.",
  intro:
    "Based in Chesterfield, we work with businesses across Derbyshire — from Derby and Belper to Buxton and the High Peak. Every project is fixed-price and scoped within 48 hours. Start with a free discovery call; if there's a clear opportunity we'll recommend a £1,500 Process Audit. Credited in full if you go on to build with us. In-person kickoff included anywhere in Derbyshire at no extra charge.",
  bullets: [
    'Fixed prices · in-person kickoff in Derbyshire',
    'Free 30-minute discovery call',
    'Process Audit £1,500 · credited if you build',
    'Builds from £3,000 · 2–6 weeks',
    'Real Derbyshire-area client case studies',
    'No retainer lock-in · no scope creep',
  ],
  proofs: [
    { client: 'Marmadbir', metric: '~65%', metricLabel: 'messaging cost cut' },
    { client: 'PlusRooms', metric: 'Full', metricLabel: 'working day saved/day' },
    { client: 'Punthub', metric: '7', metricLabel: 'live ML models' },
  ],
}

export default function Page() {
  return <LandingPage data={data} />
}
