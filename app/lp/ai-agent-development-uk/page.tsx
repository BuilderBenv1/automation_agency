import type { Metadata } from 'next'
import LandingPage, { type LandingData } from '@/components/LandingPage'

export const metadata: Metadata = {
  title: 'AI Agent Development UK — Production Builds, Fixed Prices',
  description:
    'AI agent development for UK businesses. Real production agents that monitor, decide, and act — integrated into your existing tools. Fixed prices, free discovery call, real case studies.',
  alternates: { canonical: 'https://www.automation-agency.co.uk/lp/ai-agent-development-uk' },
  robots: { index: false, follow: true },
}

const data: LandingData = {
  urlSlug: 'ai-agent-development-uk',
  eyebrow: 'AI Agent Development — UK',
  h1: (
    <>
      <em className="not-italic text-accent">AI agents</em> that monitor, decide, and act —
      built for UK businesses.
    </>
  ),
  subhead:
    'Not chatbots. Production agents that pull data, trigger actions, escalate only when a human is genuinely needed.',
  intro:
    "We build custom AI agents on the Anthropic, OpenAI, and open-source ecosystems — integrated into your existing tools, not bolted on top. Multi-agent stacks from £8,000, single-workflow builds from £3,000. All fixed-price and scoped upfront. Start with a free 30-minute discovery call; if there's a clear opportunity we'll quote you a Process Audit (£1,500, credited against build).",
  bullets: [
    'Production agents · not demos or POCs',
    'Anthropic / OpenAI / open-source models',
    'Integrated with your existing stack',
    'Fixed prices · no surprise invoices',
    'Multi-agent builds from £8,000',
    'Built by a senior engineer, no juniors',
  ],
  proofs: [
    { client: 'Marmadbir', metric: '< 5min', metricLabel: 'tenant onboarding' },
    { client: 'Punthub', metric: '7', metricLabel: 'autonomous ML models' },
    { client: 'PlusRooms', metric: '24h', metricLabel: 'data freshness cycle' },
  ],
}

export default function Page() {
  return <LandingPage data={data} />
}
