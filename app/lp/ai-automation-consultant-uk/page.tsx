import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'AI Automation Consultant UK — Fixed Prices, Free Discovery Call',
  description:
    'AI automation consultant UK. Process Audits from £1,500 (credited if you build), fixed-price builds from £3,000. Real production AI agents and automation systems. Book a free 30-minute call.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/lp/ai-automation-consultant-uk' },
  robots: { index: false, follow: true },
}

const data: LandingData = {
  urlSlug: 'ai-automation-consultant-uk',
  eyebrow: 'AI Automation Consultant — UK',
  h1: (
    <>
      Looking for an{' '}
      <em className="not-italic text-accent">AI automation consultant</em> in the UK?
    </>
  ),
  subhead:
    'You found one who actually ships production systems. 10+ years writing the code, not just advising on it.',
  intro:
    "We build AI agents and automation systems for UK businesses — fixed-price, scoped within 48 hours, delivered in 2–6 weeks. Every engagement starts with a free 30-minute discovery call. If there's a clear opportunity, our £1,500 Process Audit gives you a written report with ROI estimates and fixed-price quotes. Credited in full if you go on to build with us.",
  bullets: [
    'Fixed prices · scoped before work starts',
    'Free 30-minute discovery call',
    'Process Audit credited if you build',
    'Real production case studies (not slideware)',
    'No retainer lock-in · no scope creep',
    'In-person across Derbyshire / Sheffield / Notts',
  ],
  proofs: [
    { client: 'Marmadbir', metric: '5★', metricLabel: 'Google review' },
    { client: 'PlusRooms', metric: '97%', metricLabel: 'borough coverage' },
    { client: 'Punthub', metric: '0', metricLabel: 'human touchpoints / day' },
  ],
}

export default function Page() {
  return <LandingPage data={data} />
}
